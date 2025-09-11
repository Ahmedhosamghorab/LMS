import type {  Request ,  Response} from "express"
import prisma from "../config/prisma"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendVerificationEmail } from "../services/mailer"
import jwt from "jsonwebtoken"
import { Role } from "@prisma/client"
interface  RegisterationBody {
  name: string;
  email: string;
  password: string;
  profile_pic?: string; 
  type: Role; 
}
interface LoginBody {
  email: string;
  password: string;
}
interface VerificationBody {
  email: string;
  verificationCode: number;
}
const register = async (
  req: Request<{}, {}, RegisterationBody>,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { name, email, password, profile_pic, type } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationOtp = crypto.randomInt(100000, 999999);
    const verificationOtpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile_pic: profile_pic ?? null,
        type,
        verificationOtp,
        verificationOtpExpires,
      },
    });
    await sendVerificationEmail(email, verificationOtp);
    return res.status(201).json({ message: "check your email to verify your account" });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: "internal server error" });
  }
};
const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ message: "Login successful" });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const resendEmailVerificationCode = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    const verificationCode = crypto.randomInt(100000, 999999);
    await prisma.user.update({
      where: { email },
      data: {
        verificationOtp: verificationCode,
        verificationOtpExpires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    await sendVerificationEmail(email, verificationCode);
    return res.status(200).json({ message: "Verification code sent. Please check your email." });
  } catch (err) {
    console.error('resendEmailVerificationCode error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const verifyUser = async (
  req: Request<{}, {}, VerificationBody>,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { email, verificationCode } = req.body;
    if (!email || !verificationCode) {
      return res.status(400).json({ message: "Email and verification code are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    if (user.verificationOtp !== Number(verificationCode)) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    if (user.verificationOtpExpires! < new Date()) {
      return res.status(400).json({ message: "Verification code has expired" });
    }
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verified_At: new Date(),
        verificationOtp: null,
        verificationOtpExpires: null,
      },
    });
    return res.status(200).json({ message: "User verified successfully" });
  } catch (err) {
    console.error('verifyUser error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const userProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (req as any).user;
    if (!user || !user.id || isNaN(Number(user.id))) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userProfile = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
    });
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ userProfile });
  } catch (err) {
    console.error('userProfile error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export {register , login , resendEmailVerificationCode  , verifyUser , userProfile}
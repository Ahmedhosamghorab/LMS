import type { Request , Response , NextFunction} from "express"
import jwt from "jsonwebtoken"
const authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
}
export {authenticated}
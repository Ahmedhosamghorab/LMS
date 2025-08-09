import {  GraduationCap } from "lucide-react";
import { useState, } from "react";

export default function Login() {
    // --- State Management ---
    const [isSignup, setIsSignup] = useState<boolean>(false);

    interface ILoginData {
        email: string;
        password: string;
    }
    interface ILoginError {
        email: boolean;
        password: boolean;
    }
    const [loginData, setLoginData] = useState<ILoginData>({ email: "", password: "" });
    const [loginError, setLoginError] = useState<ILoginError>({ email: false, password: false });

    // --- Signup Form State and Types ---
    interface ISignupData {
        username: string;
        email: string;
        password: string;
        profilePicture: File | null;
    }
    interface ISignupError {
        username: boolean;
        email: boolean;
        password: boolean;
        profilePicture: boolean;
    }
    const [signupData, setSignupData] = useState<ISignupData>({ username: "", email: "", password: "", profilePicture: null });
    const [signupError, setSignupError] = useState<ISignupError>({ username: false, email: false, password: false, profilePicture: false });


    function handleLoginInputChange(e: any) {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    }

    function handleLoginSubmit(e: any) {
        e.preventDefault();
        const { email, password } = loginData;
        const newErrors = { email: !email, password: !password };
        setLoginError(newErrors);

        if (newErrors.email || newErrors.password) {
            console.log("Login validation failed.");
            return;
        }
        console.log("Submitting login data:", loginData);
        // TODO: Add API call for login
    }

    // Handles changes for Signup form inputs, including the file input
    function handleSignupInputChange(e: any) {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files && files.length > 0) {
            setSignupData(prev => ({ ...prev, profilePicture: files[0] }));
        } else {
            setSignupData(prev => ({ ...prev, [name]: value }));
        }
    }

    function handleSignupSubmit(e: any) {
        e.preventDefault();
        const { username, email, password, profilePicture } = signupData;
        const newErrors = {
            username: !username,
            email: !email,
            password: !password,
            profilePicture: !profilePicture,
        };
        setSignupError(newErrors);

        if (Object.values(newErrors).some(err => err)) {
            console.log("Signup validation failed.");
            return;
        }
        console.log("Submitting signup data:", signupData);
        // TODO: Add API call for signup
    }

    return (
        <main className="h-screen flex bg-gray-50">
            {/* Form Section */}
            <section className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-3">
                            <span>{isSignup ? "Create Account" : "Welcome Back"}</span>
                            <GraduationCap className="text-white bg-indigo-600 rounded-full p-2 w-12 h-12" />
                        </h1>
                        <p className="text-gray-500 mt-2">Enter to get unlimited access to data & information.</p>
                    </div>
                    
                    <form name="login" action="" method="post" className={`flex flex-col gap-4 ${isSignup ? "hidden" : ""}`} onSubmit={handleLoginSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="email">Email</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your mail address"
                                value={loginData.email}
                                onChange={handleLoginInputChange}
                            />
                            <span className={`text-sm ${loginError.email ? "" : "hidden"} text-red-500 font-bold`}>* Please enter a valid email.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                            />
                            <span className={`text-sm ${loginError.password ? "" : "hidden"}  text-red-500 font-bold`}>* Please enter your password.</span>
                        </div>
                        <input
                            className="py-3 text-white text-lg rounded-md bg-indigo-600 w-full mt-4 cursor-pointer hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            type="submit"
                            value="Log In"
                        />
                        <hr className="mt-5" />
                        <button type="button" className="border-1 inline-flex gap-4 items-center justify-center cursor-pointer mt-5 py-3 text-gray-500 text-lg rounded-md bg-white w-full  hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">Continue With Google <img className="w-6 h-6" src="/GoogleIcon.png" alt="Google Icon" /> </button>
                        <button type="button" onClick={() => { setIsSignup(true) }} className="mt-5 block text-center">Don't Have An Account? <span className="text-sm text-indigo-600 font-bold cursor-pointer underline">Sign up</span></button>
                    </form>

                    <form name="signup" action="" method="post" className={`flex flex-col gap-4 ${isSignup ? "" : "hidden"}`} onSubmit={handleSignupSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="username">UserName</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter UserName"
                                value={signupData.username}
                                onChange={handleSignupInputChange}
                            />
                            <span className={`text-sm ${signupError.username ? "" : "hidden"}  text-red-500 font-bold`}>* Please enter a valid username.</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="email1">Email</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="email"
                                name="email"
                                id="email1"
                                placeholder="Enter your mail address"
                                value={signupData.email}
                                onChange={handleSignupInputChange}
                            />
                            <span className={`text-sm ${signupError.email ? "" : "hidden"} text-red-500 font-bold`}>* Please enter a valid email.</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="password1">Password</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="password"
                                name="password"
                                id="password1"
                                placeholder="Enter password"
                                value={signupData.password}
                                onChange={handleSignupInputChange}
                            />
                            <span className={`text-sm ${signupError.password ? "" : "hidden"} text-red-500 font-bold`}>* Please enter a password.</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="picture">Profile Picture</label>
                            <input
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="file"
                                name="profilePicture"
                                id="picture"
                                accept="image/*"
                                onChange={handleSignupInputChange}
                            />
                            <span className={`text-sm ${signupError.profilePicture ? "" : "hidden"} text-red-500 font-bold`}>* Please upload a profile picture.</span>
                        </div>
                        
                        <input
                            className="py-3 text-white text-lg rounded-md bg-indigo-600 w-full mt-4 cursor-pointer hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            type="submit"
                            value="Sign Up"
                        />
                        <button type="button" onClick={() => { setIsSignup(false) }} className="mt-5 block text-center">Already Have An Account? <span className="text-sm text-indigo-600 font-bold cursor-pointer underline">Log In</span></button>
                    </form>
                </div>
            </section>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 bg-[url(/relogin.jpg)] bg-cover bg-center">
            </div>
        </main>
    );
}
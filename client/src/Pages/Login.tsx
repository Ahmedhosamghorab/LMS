import { GlassesIcon, GraduationCap } from "lucide-react";

export default function Login() {
    return (
        <main className="h-screen flex bg-gray-50">
            {/* Form Section */}
            <section className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-3">
                            <span>Welcome back</span>
                            <GraduationCap className="text-white bg-indigo-600 rounded-full p-2 w-12 h-12" />
                        </h1>
                        <p className="text-gray-500 mt-2">Enter to get unlimited access to data & information.</p>
                    </div>

                    <form action="" method="post" className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="email">Email</label>
                            <input
                                required
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your mail address"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                required
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                            />
                        </div>
                        <input
                            className="py-3 text-white text-lg rounded-md bg-indigo-600 w-full mt-4 cursor-pointer hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            type="submit"
                            value="Log In"
                        />
                    </form>

                    
                    <hr className="mt-5" />
                    <button className=" border-1 inline-flex gap-4 items-center justify-center cursor-pointer mt-5 py-3 text-gray-500 text-lg rounded-md bg-white-600 w-full  hover:bg-white-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500">Continue With Google <GlassesIcon/> </button>
                </div>
            </section>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 bg-[url(/relogin.jpg)] bg-cover bg-center">
            </div>
        </main>
    );
}
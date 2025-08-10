import { GraduationCap } from "lucide-react";

export default function LnadingPage()
{
    return(
    <>
    <header className="shadow-lg p-2 px-5">
        <nav className="flex justify-between px-5 py-2">
            <div className="flex gap-2">
                <p className="flex-1 text-2xl inline-flex gap-2 items-center justify-center font-bold text-[#4f46e5]"> <GraduationCap className="  p-1  w-[40px] h-[40px]  rounded" /> EduLearn</p>
                <ul className="hidden gap-2 items-center justify-center ms-5 md:flex">
                    <li className="hover:text-[#4f46e5] transistion-all delay-75 mx-3"><a href="#">Home</a></li>
                    <li className="hover:text-[#4f46e5] transistion-all delay-75 mx-3"><a href="#">Courses</a></li>
                    <li className="hover:text-[#4f46e5] transistion-all delay-75 mx-3"><a href="#">About</a></li>
                    <li className="hover:text-[#4f46e5] transistion-all delay-75 mx-3"><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <button className=" p-2 rounded cursor-pointer">Login</button>
                <button className="  px-3 py-2 rounded cursor-pointer bg-blue-500 text-white hover:bg-blue-700 transition-all delay-75">Sign up</button>
            </div>
        </nav>
    </header>
    <main className="h-[screen - 70px]">
        <section className="max-w-full flex h-[calc(100vh-96px)]">
            <div className=" flex-1  md:text-start text-center bg-gray-100 flex p-5 items-center justify-center flex-col gap-4">
                <h1 className="text-6xl font-bold text-gray-800 max-w-150">Transform Your Learning Experience</h1>
                <p className="text-2xl text-gray-500  max-w-150 ">Access thousands of courses taught by expert instructors and take your skills to the next level. </p>
            </div>
            <div className=" flex-0 bg-[url(/relogin.jpg)] bg-red-500  md:flex-1  ">

            </div>
        </section>
    </main>
    </>
    )

}
import NavBarItem from "@/Components/NavBarItem";
import { Bell, BookTextIcon, CalendarRange, CircleCheckBig, GraduationCap, HomeIcon, LogOutIcon, MessageSquareTextIcon, SearchIcon, SettingsIcon, SidebarOpenIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function StudentDashboard()
{
    const [toggle,setToggle] = useState<Boolean>(false)



    return(
        <>
        <main>
            <aside id="navbar"  className={`flex absolute top-0 left-0 w-64  -translate-x  h-screen  flex-col m-0 shadow-lg  transform   md:translate-x-0  ${toggle? "translate-x-0 z-0" : "z-10"} -translate-x-full`}>
                <div className="title  p-5 font-bold flex gap-3 items-center justify-center   border-b border-gray-10  mb-5">
                    <GraduationCap className="bg-[#4f46e5] text-white p-1  w-[40px] h-[40px]  rounded"/>
                    <p className="m-0  text-gray-700 text-lg">EduLearn </p>
                </div>
                <div className="p-5">
                    <NavBarItem classes="mt-3"  icon={<HomeIcon/>} text="Dashboard"/>
                    <NavBarItem classes="mt-3"  icon={<BookTextIcon/>} text="My Courses"/>
                    <NavBarItem classes="mt-3"  icon={<CalendarRange/>} text="Calendar"/>
                    <NavBarItem classes="mt-3"  icon={<MessageSquareTextIcon/>} text="Messages"/>
                    <NavBarItem classes="mt-3"  icon={<CircleCheckBig/>} text="Certificates"/>
                    <NavBarItem classes="mt-3"  icon={<SettingsIcon/>} text="Settings"/>
                </div>
                <div className="mt-auto p-5">
                    <NavBarItem  icon={<LogOutIcon/>} text="LogOut" />
                </div>
            </aside>
            <section className="md:ml-64">
                <header className="shadow-lg z-2 flex items-center justify-between p-4">
                    <div className="w-25 relative  md:block hidden">
                        <SearchIcon className="absolute   top-2 left-2" />
                        <input type="text" className="w-100 p-2 border-1 rounded ps-10" name="" placeholder="Search For Courses Lessons"  />
                    </div>
                    <div className="md:hidden block">
                        <button className="cursor-pointer" onClick={()=>{setToggle(!toggle)}}>
                            <SidebarOpenIcon/>
                        </button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <span className="rounded-full bg-red-600 text-white text-center w-[20px] absolute top-6 text-sm  translate-x-3 z-10">2</span>
                        <Bell className="relative"/>
                        <div className="flex gap-2">
                            <div className="w-[50px] rounded-full overflow-hidden">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="" />
                            </div>
                            <div className="flex-col gap-2">
                                <p>Emma Wattson</p>
                                <p className="text-sm text-gray-400">Student</p>
                            </div>
                        </div>
                    </div>
                </header>
            </section>
        </main>
        </>
    )
}
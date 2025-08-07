import NavBarItem from "@/Components/NavBarItem";
import { BookTextIcon, CalendarRange, CircleCheckBig, GraduationCap, HomeIcon, LogOutIcon, MessageSquareTextIcon, SettingsIcon } from "lucide-react";

export default function StudentDashboard()
{


    return(
        <>
        <main>
            <aside className="pe-5 p-2 flex absolute top-0 left-0 w-64   h-screen  flex-col m-0 shadow-lg">
                <div className="title  p-5 font-bold flex gap-3 items-center justify-center   border-b border-gray-300  mb-5">
                    <GraduationCap className="bg-[#4f46e5] text-white p-1  w-[40px] h-[40px]  rounded"/>
                    <p className="m-0  text-gray-700 text-lg">EduLearn </p>
                </div>
                <div className="links">
                    <NavBarItem  icon={<HomeIcon/>} text="Dashboard"/>
                    <NavBarItem  icon={<BookTextIcon/>} text="My Courses"/>
                    <NavBarItem  icon={<CalendarRange/>} text="Calendar"/>
                    <NavBarItem  icon={<MessageSquareTextIcon/>} text="Messages"/>
                    <NavBarItem  icon={<CircleCheckBig/>} text="Certificates"/>
                    <NavBarItem  icon={<SettingsIcon/>} text="Settings"/>
                </div>
                <NavBarItem classes="mt-auto " icon={<LogOutIcon/>} text="LogOut" />
            </aside>
            <section></section>
        </main>
        </>
    )
}
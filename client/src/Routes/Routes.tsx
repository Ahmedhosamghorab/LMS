import Login from "@/Pages/Login";
import Real from "@/Pages/Real";
import StudentDashboard from "@/Pages/StudentDashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <StudentDashboard/>
    },
    {
        path:"/real",
        element: <Real/>
    },
    {
        path:"/auth/login",
        element: <Login/>
    },

]);
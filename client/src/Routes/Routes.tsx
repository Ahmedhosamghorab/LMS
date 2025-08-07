import StudentDashboard from "@/Pages/StudentDashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <StudentDashboard/>
    },

]);
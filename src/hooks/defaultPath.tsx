import { Navigate } from "react-router-dom";

export default function DefaultPath({children}: { children: React.ReactNode }){
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}
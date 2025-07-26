import { Navigate } from "react-router-dom";
import { useUserContext } from "./useUserContext";

export default function DefaultPath({children}: { children: React.ReactNode }){
    const {isLoggedIn} = useUserContext()
    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}
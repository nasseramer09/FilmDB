import { Navigate, Outlet} from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { ReactNode } from "react";

type ProtectedRouteProps={
    children? : ReactNode;
}


const ProtectedRoute = ({children}:ProtectedRouteProps) => {

    const isLogedIn = useUserStore((state)=> state.isLogedIn);

    if(!isLogedIn){
        return <Navigate to="/" />
    }
    return children ? <> {children} </> : <Outlet/>;
}

export default ProtectedRoute;
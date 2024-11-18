import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
    canActivate,
    redirectPath = '/login'
}) => {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet></Outlet>
}
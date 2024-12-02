import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
    canActivate,
    redirectPath = '/home',
    setShowLoginModal
}) => {
    if (!canActivate) {
        setShowLoginModal(true);
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet></Outlet>
}
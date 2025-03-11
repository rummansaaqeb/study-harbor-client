import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className="flex min-h-screen justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>
    }

    if (!user || role !== 'admin') {
        return <Navigate to='/' state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default AdminRoute;
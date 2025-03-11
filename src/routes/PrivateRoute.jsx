import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg text-center mt-[50%]"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/auth/login' state={{from: location}}></Navigate>
};

export default PrivateRoute;
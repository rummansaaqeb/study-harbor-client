import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const AuthLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import logo from '../../assets/logo-bgremoved.png'
import { FaBook, FaHome, FaUsers } from "react-icons/fa";
import { BsBackpack4Fill } from "react-icons/bs";

const AdminDashboard = () => {

    const { user } = useAuth();
    const location = useLocation();
    const { role } = useRole();

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="my-24 btn btn-lg btn-outline font-bold hover:bg-black hover:text-white drawer-button lg:hidden">
                        Navigate
                    </label>
                    {/* Page content here */}
                    {
                        location.pathname === '/dashboard/admin' && <div className='flex flex-col justify-center items-center shadow-md w-96 p-8'>
                            <div className='mb-4'>
                                <img
                                    className='w-40 h-40 rounded-full object-cover'
                                    src={user?.photoURL}
                                    alt={user?.displayName}
                                />
                            </div>
                            <div className='text-center'>
                                <p className="text-lg italic">Welcome Back</p>
                                <h2 className='text-xl font-bold mb-8'>{user?.displayName}</h2>
                                <p className="capitalize font-bold">Role: {role}</p>
                            </div>
                        </div>
                    }
                    <div className="lg:w-auto md:w-auto w-full lg:mb-0 md:mb-0 mb-24">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
                        <img src={logo} className="w-30 h-30 rounded-full object-cover mx-auto" alt="" />
                        {/* Sidebar content here */}
                        <li>
                            <Link className='text-lg' to='/dashboard/admin'>
                                <FaHome className="w-5 h-5"></FaHome>
                                Admin Home
                            </Link>
                        </li>
                        <li>
                            <NavLink className='text-lg' to='/dashboard/admin/allUsers'>
                                <FaUsers className="w-5 h-5"></FaUsers>
                                View Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='text-lg' to='/dashboard/admin/allSessions'>
                                <FaBook />
                                View Study Sessions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='text-lg' to='/dashboard/admin/allMaterials'>
                                <BsBackpack4Fill />
                                View Materials
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li className="mb-8">
                            <NavLink className='text-lg' to='/'>
                                <FaHome className="w-5 h-5"></FaHome>
                                Home
                            </NavLink>
                        </li>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="tooltip tooltip-bottom rounded-full" data-tip={user?.email || user?.providerData[0].email} >
                                <img className="w-16 h-16 object-cover rounded-full" src={user?.photoURL || 'https://i.postimg.cc/g05G0y9m/user.jpg'} alt="" />
                            </div>
                            <span className="text-xs uppercase font-bold">{user?.displayName}</span>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
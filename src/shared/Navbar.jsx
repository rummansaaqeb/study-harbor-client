import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
const Navbar = () => {

    const { user, logOut, loading } = useAuth();
    const { role } = useRole();


    return (
        <div className="navbar bg-base-100 container mx-auto pb-5">
            <div className="navbar-start">
                <img className='w-24 h-16 object-cover' src={logo} alt="" />
                <Link to='/'>
                    <h1 className="text-2xl font-bold tracking-wider hover:cursor-pointer lg:block md:block hidden">StudyHarbor</h1>
                </Link>
            </div>
            <div className="navbar-end space-x-5">
                {
                    user ?
                        <>
                            <div className="tooltip tooltip-bottom rounded-full" data-tip={user?.email || user?.providerData[0].email} >
                                <img className="lg:w-16 lg:h-16 object-cover rounded-full shrink-0 lg:block md:block hidden" src={user?.photoURL || 'https://i.postimg.cc/g05G0y9m/user.jpg'} alt="" />
                            </div>
                            <span className="text-xs uppercase font-bold hidden md:block lg:block">{user?.displayName}</span>
                            <Link to={`/dashboard/${role}`} className='btn lg:btn-lg btn-outline font-bold hover:bg-black hover:text-white'>DASHBOARD</Link>
                            <button onClick={logOut} className="btn lg:btn-lg btn-outline font-bold hover:bg-black hover:text-white">LOGOUT</button>
                        </>
                        :
                        <>
                            {
                                loading ? <>
                                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                                    <span className="text-xs uppercase font-bold hidden md:block lg:block">{user?.displayName}</span>
                                    <div className="skeleton btn lg:btn-lg"></div>
                                </> : <>
                                    <Link to='/auth/login'>
                                        <button className='btn lg:btn-lg btn-outline font-bold hover:bg-black hover:text-white'>LOGIN</button>
                                    </Link>
                                    <Link to='/auth/register'>
                                        <button className='btn lg:btn-lg btn-outline font-bold hover:bg-black hover:text-white'>REGISTER</button>
                                    </Link>
                                </>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;
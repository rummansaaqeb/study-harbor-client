import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import Navbar from "../shared/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "../components/GoogleLogin";
import GithubLogin from "../components/GithubLogin";

const Login = () => {
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });

        signIn(email, password)
            .then(result => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You are now logged in!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
    }

    const togglePassword = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <div>
            <header>
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>
            <div className="w-full flex flex-col justify-center items-center lg:h-screen lg:mt-0 my-12">
                <h2 className="text-3xl font-bold mb-4">Login</h2>
                <form className="flex flex-col border border-[#E8E8E8] p-16 space-y-8 rounded-md lg:px-16 md:px-16 px-5" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <p className="mb-2">Email Address <span className="text-red-500">*</span></p>
                        <input className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="email" placeholder="Email" name="email" />
                    </div>
                    {/* Password */}
                    <div>
                        <p className="mb-2">Password <span className="text-red-500">*</span></p>
                        <div className="relative flex flex-col">
                            <span onClick={togglePassword} className="absolute right-6 top-4 cursor-pointer hover:scale-125 transition ease-in">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </span>
                            <input className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" />
                        </div>
                    </div>
                    <GoogleLogin></GoogleLogin>
                    <GithubLogin></GithubLogin>
                    <input type="submit" value="LOGIN" className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white" />
                    <p className="text-center">New Here? <Link className="text-red-600 font-bold" to='/auth/register'>Create An Account</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
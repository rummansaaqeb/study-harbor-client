import { useState } from "react";
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import Navbar from '../shared/Navbar';
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "../components/GoogleLogin";
import GithubLogin from "../components/GithubLogin";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        createNewUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photo,
                            role: data.role,
                        }
                        setUser(loggedUser);
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Your account has been registered successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
            })
            .catch(error => {
                // console.log(error.message);
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
            <div className="w-full flex flex-col justify-center items-center lg:h-screen my-12">
                <h2 className="text-3xl font-bold mb-4">Register</h2>
                <form className="flex flex-col border border-[#E8E8E8] p-16 space-y-8 rounded-md lg:px-16 md:px-16 px-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div>
                        <p className="mb-2">Name <span className="text-red-500">*</span></p>
                        <input {...register("name", { required: true })} className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Name" />
                    </div>
                    {/* Email */}
                    <div>
                        <p className="mb-2">Email Address <span className="text-red-500">*</span></p>
                        <input {...register("email", { required: true })} className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="email" placeholder="Email" />
                    </div>
                    {/* Photo URL */}
                    <div>
                        <p className="mb-2">Photo URL</p>
                        <input {...register("photo")} className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Photo URL" />
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
                            <input {...register("password", { required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="lg:w-[500px] md:w-[500px] w-[350px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type={showPassword ? 'text' : 'password'} placeholder="Password" />
                            <div className="lg:w-[500px] md:w-[500px] w-[350px]">
                                {errors.password?.type === 'required' && <span className="mt-3 text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="mt-3 text-red-600">Password must be 8 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="mt-3 text-red-600">Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="mt-3 text-red-600">Password must at least have one uppercase, one lowercase, one number and one special character</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <input {...register("role")} value="student" type="radio" className="radio radio-neutral mr-2 ml-3" />
                        <p className="font-bold">Student</p>
                        <input {...register("role")} value="tutor" type="radio" className="radio radio-neutral mr-2 ml-3" />
                        <p className="font-bold">Tutor</p>
                        <input {...register("role")} value="admin" type="radio" className="radio radio-neutral mr-2 ml-3" />
                        <p className="font-bold">Admin</p>
                    </div>
                    <GoogleLogin></GoogleLogin>
                    <GithubLogin></GithubLogin>
                    <input type="submit" value="REGISTER" className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white" />
                    <p className="text-center">Already have an account? <Link to='/auth/login' className="text-red-600 font-bold">Login</Link> Now!</p>
                </form>
            </div>
        </div>
    );
};

export default Register;
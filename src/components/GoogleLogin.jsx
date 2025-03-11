import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {

    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'student',
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/');
                    })
            })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-lg font-bold bg-black text-white w-full hover:bg-gray-700">
                <FaGoogle></FaGoogle>
                Sign Up With Google
            </button>
        </div>
    );
};

export default GoogleLogin;
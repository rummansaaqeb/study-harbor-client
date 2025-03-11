import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";

const GithubLogin = () => {

    const { githubSignIn, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGithubLogin = () => {
        githubSignIn()
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.providerData[0].email,
                    role: 'student',
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <div>
            <button onClick={handleGithubLogin} className="btn btn-lg font-bold bg-black text-white w-full hover:bg-gray-700">
                <FaGithub></FaGithub>
                Sign In With Github
            </button>
        </div>
    );
};

export default GithubLogin;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://b10a12-server-side-rummansaaqeb.vercel.app'
    
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    axiosSecure.interceptors.request.use(function(config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        return Promise.reject(error);
    });


    // interceptors 401 and 403 status

    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async(error) => {
        const status = error.response.status;
        if(status === 401 || status === 403) {
            await logOut();
            navigate('/auth/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;

};

export default useAxiosSecure;
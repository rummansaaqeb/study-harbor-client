import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://b10a12-server-side-rummansaaqeb.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
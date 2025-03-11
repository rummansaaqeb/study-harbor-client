import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: role, isLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return 'student'
            }
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        }
    })
    return { role, isLoading }
};

export default useRole;
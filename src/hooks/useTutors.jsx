import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTutors = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tutors = [], refetch } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/tutors');
            return res.data;
        }
    })
    return [tutors, refetch];
};

export default useTutors;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useReviews = (sessionId) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: reviews = [] } = useQuery({
        queryKey: ['reviews', sessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${sessionId}`)
            return res.data;
        }
    })
    return [reviews, refetch];
};

export default useReviews;
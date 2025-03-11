import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import StudySessionCard from "../../components/StudySessionCard";

const ViewBookedSessions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['sessions', user?.email || user?.providerData?.[0]?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedSessions/${user?.email || user?.providerData?.[0]?.email}`);
            return res.data || [];
        }
    });

    // console.log(sessions);


    return (
        <div>
            <h2 className="text-center text-5xl font-bold">My Booked Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:ml-24 lg:px-0 md:px-0 px-5">
                {
                    sessions.map((session) => (
                        <StudySessionCard _id={session?.sessionId} title={session.sessionTitle} description={session.sessionDescription} registrationStartDate={session.registrationStartDate} registrationEndDate={session.registrationEndDate}></StudySessionCard>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewBookedSessions;

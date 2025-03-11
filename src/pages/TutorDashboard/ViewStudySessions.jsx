import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import TutorStudySessionCard from '../../components/TutorStudySessionCard';

const ViewStudySessions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: sessions = [], refetch } = useQuery({
        queryKey: ['session', user?.email || user?.providerData[0].email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${user?.email || user?.providerData[0].email}`);
            return res.data;
        }
    })

    return (
        <div>
            <h2 className='text-5xl font-bold text-center'>Study Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:px-0 md:px-0 px-5">
                {
                    sessions.map((session) => (
                        <TutorStudySessionCard key={session._id} _id={session._id} title={session.sessionTitle} description={session.sessionDescription} status={session.status} refetch={refetch} rejectionReason={session?.rejectionReason} feedback={session?.feedback}></TutorStudySessionCard>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewStudySessions;
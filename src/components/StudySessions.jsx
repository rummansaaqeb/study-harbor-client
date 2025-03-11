import { motion } from "motion/react"
import StudySessionCard from "./StudySessionCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
const StudySessions = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { data: sessions = [] } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/approved-sessions');
            return res.data;
        }
    })


    return (
        <div className="container mx-auto">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2, ease: [0, 0.71, 0.2, 1.01] }}
                className="text-5xl text-center font-bold">
                Study Sessions
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:ml-24 lg:px-0 md:px-0 px-5">
                {
                    sessions.map(session => <StudySessionCard key={session._id} _id={session._id} title={session.sessionTitle} description={session.sessionDescription} registrationStartDate={session.registrationStartDate} registrationEndDate={session.registrationEndDate}></StudySessionCard>)
                }
            </div>
        </div>
    );
};

export default StudySessions;
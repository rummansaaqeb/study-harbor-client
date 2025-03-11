import bannerImg from '../assets/entrepreneurs-meeting-office.jpg';
import { motion } from "motion/react"

const Banner = () => {
    return (
        <div className='w-full bg-center h-[700px] flex flex-col items-center justify-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${bannerImg}")` }}>
            <div className='mb-6'>
                <motion.h1 initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }} className='lg:text-5xl md:text-5xl text-4xl mb-4 text-white'>Where Curious Minds</motion.h1>
                <motion.p initial={{ opacity: 0, scale: 1, y: -30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{
                    duration: 1,
                    delay: 0.8,
                    ease: [0, 0.71, 0.2, 1.01]
                }} className='font-bold lg:text-5xl md:text-5xl text-4xl text-white text-center'>Connect and Thrive</motion.p>
            </div>
            <div>
                <motion.p initial={{ opacity: 0, x: 300 }} transition={{ duration: 1, delay: 1.2, ease: [0, 0.71, 0.2, 1.01] }} animate={{ opacity: 1, x: 0 }} className='text-[#C7C2C5] text-xl text-center font-bold lg:px-0 px-4'>A collaborative study platform that brings learners together to share knowledge, discuss ideas, <br /> and support each other in achieving academic success.</motion.p>
            </div>
        </div>
    );
};

export default Banner;
import Marquee from "react-fast-marquee";
import useTutors from "../hooks/useTutors";

const Tutors = () => {

    const [tutors] = useTutors();

    const techDescriptions = [
        "Tech enthusiast who loves to explain the latest gadgets and trends in simple terms.",
        "AI and machine learning expert, always eager to share the cutting-edge of technology.",
        "Cybersecurity specialist with a passion for educating others about online safety.",
        "Gadget reviewer and tech blogger, bringing the latest insights into the world of technology.",
        "Software developer with a flair for explaining complex algorithms in an understandable way.",
        "Cloud computing advocate, helping others harness the power of the cloud for business and personal use.",
        "Blockchain enthusiast with a deep dive into the decentralized web and crypto technologies.",
        "VR/AR expert, always at the forefront of immersive technologies and their applications.",
        "Data science aficionado, breaking down statistical models and machine learning techniques.",
        "Tech educator with a focus on simplifying hardware and software concepts for all levels."
    ];

    
    return (
        <div>
            <h1 className='text-black font-bold text-5xl text-center my-12'>Our Tutors</h1>
            <Marquee className='py-12' speed={100}>
                <div className="flex space-x-24">
                    {tutors.map(tutor => {
                        const randomDescription = techDescriptions[Math.floor(Math.random() * techDescriptions.length)];

                        return (
                            <div key={tutor._id} className='flex flex-col justify-center items-center shadow-md w-96 p-8'>
                                <div className='mb-4'>
                                    <img
                                        className='w-40 h-40 rounded-full object-cover'
                                        src={tutor.photoURL}
                                        alt={tutor.name}
                                    />
                                </div>
                                <div className='text-center'>
                                    <h2 className='text-xl font-bold mb-3'>{tutor.name}</h2>
                                    <p className='text-gray-400 italic'>"{randomDescription}"</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
};

export default Tutors;
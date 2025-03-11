import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateSession = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/session/${id}`);
            return res.data;
        }
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const sessionTitle = form.get("sessionTitle");
        const registrationStartDate = form.get("registrationStartDate");
        const registrationEndDate = form.get("registrationEndDate");
        const classStartDate = form.get("classStartDate");
        const classEndDate = form.get("classEndDate");
        const classStartTime = form.get("classStartTime");
        const sessionDuration = form.get("sessionDuration");
        const registrationFee = form.get("registrationFee");
        const tutorName = form.get("tutorName");
        const tutorEmail = form.get("tutorEmail");
        const sessionDescription = form.get("sessionDescription");

        const updatedSession = {
            sessionTitle,
            registrationStartDate,
            registrationEndDate,
            classStartDate,
            classEndDate,
            classStartTime,
            sessionDuration,
            registrationFee,
            tutorName,
            tutorEmail,
            sessionDescription,
            status: session.status,
            rejectionReason: null,
            feedback: null,
            averageRating: session.averageRating
        };

        axiosSecure.patch(`/update-session/${session._id}`, updatedSession)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Session Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/admin/allSessions')
            })

    }

    return (
        <div className="my-24">
            <h2 className="text-5xl font-bold text-center mb-20">Update Study Session</h2>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:px-0 md:px-0 px-5">
                <div>
                    <p className="mb-2">Session Title:</p>
                    <input name="sessionTitle" defaultValue={session?.sessionTitle} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" placeholder="Session Title" type="text" />
                </div>
                <div>
                    <p className="mb-2">Registration Start Date:</p>
                    <input name="registrationStartDate" defaultValue={session?.registrationStartDate} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Registration End Date:</p>
                    <input name="registrationEndDate" defaultValue={session?.registrationEndDate} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class Start Date:</p>
                    <input name="classStartDate" defaultValue={session?.classStartDate} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class End Date:</p>
                    <input name="classEndDate" defaultValue={session?.classEndDate} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class Start Time:</p>
                    <input name="classStartTime" defaultValue={session?.classStartTime} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" />
                </div>
                <div>
                    <p className="mb-2">Session Duration:</p>
                    <input name="sessionDuration" defaultValue={session?.sessionDuration} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" placeholder="Session Duration" type="text" />
                </div>
                <div>
                    <p className="mb-2">Registration Fee:</p>
                    <input name="registrationFee" defaultValue={session?.registrationFee} className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" />
                </div>
                <div>
                    <p className="mb-2">Tutor Name:</p>
                    <input name="tutorName" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" value={session?.tutorName} readOnly />
                </div>
                <div>
                    <p className="mb-2">Tutor Email:</p>
                    <input name="tutorEmail" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="email" value={session?.tutorEmail} readOnly />
                </div>
                <div className="lg:col-span-2">
                    <p className="mb-2">Session Description:</p>
                    <textarea placeholder="Tell Us What You're Thinking..." defaultValue={session?.sessionDescription} className="w-full h-[300px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" name="sessionDescription" id=""></textarea>
                </div>
                <div className="lg:col-span-2">
                    <input type="submit" value="UPDATE" className="btn btn-lg w-full btn-outline font-bold hover:bg-black hover:text-white" />
                </div>
            </form>
        </div>
    );
};

export default UpdateSession;
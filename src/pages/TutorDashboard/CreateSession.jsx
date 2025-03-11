import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateSession = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const ratings = [4.5, 4.2, 5.0, 3.7, 4.1, 5.0, 4.3, 4.8, 4.2, 3.5, 4.9, 4.4, 4.6, 5.0, 4.3, 3.8, 5.0, 4.7, 4.2, 4.1];

    ratings.sort(() => Math.random() - 0.5);
    const randomRating = ratings[Math.floor(Math.random() * ratings.length)];

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const sessionTitle = form.sessionTitle.value;
        const registrationStartDate = form.registrationStartDate.value;
        const registrationEndDate = form.registrationEndDate.value;
        const classStartDate = form.classStartDate.value;
        const classEndDate = form.classEndDate.value;
        const classStartTime = form.classStartTime.value;
        const sessionDuration = form.sessionDuration.value;
        const registrationFee = form.registrationFee.value;
        const tutorName = form.tutorName.value;
        const tutorEmail = form.tutorEmail.value;
        const sessionDescription = form.sessionDescription.value;

        const session = {
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
            averageRating: randomRating,
            sessionDescription,
            status: 'pending',
        }

        axiosSecure.post('/sessions', session)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Session Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            })
            .catch(error => {
                console.error(error);
            })


    }
    return (
        <div className="my-24">
            <h2 className="text-5xl font-bold text-center mb-20">Create Study Session</h2>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:px-0 md:px-0 px-5">
                <div>
                    <p className="mb-2">Session Title:</p>
                    <input name="sessionTitle" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" placeholder="Session Title" type="text" />
                </div>
                <div>
                    <p className="mb-2">Registration Start Date:</p>
                    <input name="registrationStartDate" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Registration End Date:</p>
                    <input name="registrationEndDate" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class Start Date:</p>
                    <input name="classStartDate" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class End Date:</p>
                    <input name="classEndDate" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="date" />
                </div>
                <div>
                    <p className="mb-2">Class Start Time:</p>
                    <input name="classStartTime" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Class Start Time" />
                </div>
                <div>
                    <p className="mb-2">Session Duration:</p>
                    <input name="sessionDuration" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" placeholder="Session Duration" type="text" />
                </div>
                <div>
                    <p className="mb-2">Registration Fee:</p>
                    <input name="registrationFee" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" value={0} readOnly />
                </div>
                <div>
                    <p className="mb-2">Tutor Name:</p>
                    <input name="tutorName" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" value={user?.displayName} readOnly />
                </div>
                <div>
                    <p className="mb-2">Tutor Email:</p>
                    <input name="tutorEmail" className="lg:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="email" value={user?.email || user?.providerData[0]?.email} readOnly />
                </div>
                <div className="lg:col-span-2">
                    <p className="mb-2">Session Description:</p>
                    <textarea placeholder="Tell Us What You're Thinking..." className="w-full h-[300px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" name="sessionDescription" id=""></textarea>
                </div>
                <div className="lg:col-span-2">
                    <input type="submit" value="CREATE" className="btn btn-lg w-full btn-outline font-bold hover:bg-black hover:text-white" />
                </div>
            </form>
        </div>
    );
};

export default CreateSession;
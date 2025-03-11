import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Notes = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const title = form.title.value;
        const description = form.description.value;

        const note = {
            email, title, description
        }
        axiosSecure.post('/notes', note)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Note Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            })

    }

    return (
        <div>
            <h2 className="text-5xl text-center font-bold">Create A Note</h2>
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                {/* Email */}
                <div>
                    <p className="mb-2">Email Address <span className="text-red-500">*</span></p>
                    <input name="email" className="lg:w-[500px] md:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="email" value={user?.email || user?.providerData[0]?.email || ""} readOnly />
                </div>
                {/* Title */}
                <div>
                    <p className="mb-2">Title: <span className="text-red-500">*</span></p>
                    <input name="title" className="lg:w-[500px] md:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="TItle" />
                </div>
                <div>
                    <p className="mb-2">Description:</p>
                    <textarea placeholder="Tell Us What You're Thinking....." className="w-full h-[300px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" name="description" id=""></textarea>
                </div>
                <input type="submit" value="CREATE" className="btn btn-lg lg:w-[500px] md:w-[500px] w-full btn-outline font-bold hover:bg-black hover:text-white" />
            </form>
        </div>
    );
};

export default Notes;
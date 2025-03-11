import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateNote = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: note } = useQuery({
        queryKey: ['note', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/note/${id}`);
            return res.data;
        }
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
        }
    }, [note]);

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.patch(`/note/${id}`, { title, description });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Note Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/student/manageNotes');
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div className="">
            <h2 className="text-5xl text-center font-bold">Update Note</h2>
            <form onSubmit={handleUpdateNote} className="mt-12 space-y-6 lg:px-0 md:px-0 px-5">
                {/* Title */}
                <div>
                    <p className="mb-2">Title: <span className="text-red-500">*</span></p>
                    <input
                        name="title"
                        className="lg:w-[500px] md:w-[500px] w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/* Description */}
                <div>
                    <p className="mb-2">Description:</p>
                    <textarea
                        placeholder="Tell Us What You're Thinking..."
                        className="lg:w-[500px] md:w-[500px] w-full h-[300px] border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <input
                    type="submit"
                    value="UPDATE"
                    className="btn btn-lg lg:w-[500px] md:w-[500px] w-full btn-outline font-bold hover:bg-black hover:text-white"
                />
            </form>
        </div>
    );
};

export default UpdateNote;

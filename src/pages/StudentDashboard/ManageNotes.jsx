import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import NoteDetails from "./NoteDetails";
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageNotes = () => {
    const axiosSecure = useAxiosSecure();
    const { data: notes = [], refetch } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/notes');
            return res.data;
        }
    });


    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNote(null);
        setIsModalOpen(false);
    };

    const maxLength = 40;

    const handleDeleteNote = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/note/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your note has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }



    return (
        <div className="overflow-x-auto lg:w-auto md:w-[800px] w-auto">
            <h2 className="text-5xl font-bold text-center mb-20">Manage Notes</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Added By</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        notes.map((note, index) => (
                            <tr key={note._id}>
                                <td>{index + 1}</td>
                                <td className="whitespace-nowrap">{note.title}</td>
                                <td className="whitespace-nowrap">
                                    {
                                        note.description.length > maxLength ? `${note.description.slice(0, maxLength)}...` : note.description
                                    }
                                </td>
                                <td>{note.email}</td>
                                <th>
                                    <button className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white" onClick={() => openModal(note)}>Details</button>
                                </th>
                                <th>
                                    <Link to={`/dashboard/student/updateNote/${note._id}`}>
                                        <button className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">
                                            <GrUpdate></GrUpdate>
                                        </button>
                                    </Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteNote(note._id)} className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">
                                        <FaRegTrashAlt></FaRegTrashAlt>
                                    </button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                {isModalOpen && selectedNote && (
                    <NoteDetails note={selectedNote} closeModal={closeModal} />
                )}
            </div>
        </div>
    );
};

export default ManageNotes;

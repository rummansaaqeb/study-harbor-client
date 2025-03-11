import React from 'react';
import { FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TutorStudySessionCard = ({ title, description, _id, status, refetch, rejectionReason, feedback }) => {

    const axiosSecure = useAxiosSecure();

    const handleUpdateStatus = () => {
        axiosSecure.patch(`/session/${_id}`)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Approval Request Sent To Admin!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            })
    }


    return (
        <div className="card w-96 bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="mb-4">{description}</p>
                <div>
                    {
                        status === "approved" &&
                        <>
                            <div className="btn bg-green-600 text-white capitalize">{status}</div>
                        </>
                    }
                    {
                        status === "pending" &&
                        <>
                            <div className="btn bg-gray-600 text-white capitalize">{status}</div>
                        </>
                    }
                    {
                        status === "rejected" &&
                        <>
                            <div className='flex flex-col'>
                                <div className='flex justify-start mb-4'>
                                    <div className="btn bg-red-600 text-white capitalize mr-6">{status}</div>
                                    <button onClick={handleUpdateStatus} className='btn btn-outline font-bold hover:bg-black hover:text-white'>
                                        <FaRedo></FaRedo>
                                    </button>
                                    {/* The button to open modal */}
                                    <label htmlFor="reasonModal" className="btn font-bold btn-outline hover:bg-black hover:text-white ml-6">Reason</label>

                                    {/* Put this part before </body> tag */}
                                    <input type="checkbox" id="reasonModal" className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box">
                                            <div className="mb-5">
                                                <p className='mb-4'><span className='text-red-600 font-semibold'>Reason: </span>{rejectionReason}</p>
                                                <p><span className='text-red-600 font-semibold'>Feedback: </span>{feedback}</p>
                                            </div>
                                            <div className="modal-action">
                                                <label htmlFor="reasonModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
                <div className="justify-end card-actions">
                    <Link to={`/session/${_id}`}>
                        <button className="btn btn-primary">{location.pathname == '/' ? "Read More" : "View Details"}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorStudySessionCard;
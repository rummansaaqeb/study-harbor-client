import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrUpdate } from "react-icons/gr";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AllSessions = () => {
    const [showField, setShowField] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { data: sessions = [], refetch } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sessions');
            return res.data;
        }
    });

    const maxLength = 40;
    const sessionsPerPage = 5;

    // Pagination states for each table
    const [pendingPage, setPendingPage] = useState(1);
    const [approvedPage, setApprovedPage] = useState(1);
    const [rejectedPage, setRejectedPage] = useState(1);

    // Filter sessions based on status
    const pendingSessions = sessions.filter(session => session.status === 'pending');
    const approvedSessions = sessions.filter(session => session.status === 'approved');
    const rejectedSessions = sessions.filter(session => session.status === 'rejected');

    // Calculate total pages
    const totalPendingPages = Math.ceil(pendingSessions.length / sessionsPerPage);
    const totalApprovedPages = Math.ceil(approvedSessions.length / sessionsPerPage);
    const totalRejectedPages = Math.ceil(rejectedSessions.length / sessionsPerPage);

    // Get paginated data
    const paginatedPending = pendingSessions.slice((pendingPage - 1) * sessionsPerPage, pendingPage * sessionsPerPage);
    const paginatedApproved = approvedSessions.slice((approvedPage - 1) * sessionsPerPage, approvedPage * sessionsPerPage);
    const paginatedRejected = rejectedSessions.slice((rejectedPage - 1) * sessionsPerPage, rejectedPage * sessionsPerPage);


    const handleApproveSession = (e) => {
        e.preventDefault();
        const fee = e.target.fee.value;
        // console.log(fee);
        const updatedSession = {
            registrationFee: fee
        }
        axiosSecure.patch(`/approve-session/${selectedSession._id}`, updatedSession)
            .then(res => {
                refetch();
                setShowField(false);
                setSelectedSession(null);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Session Has Been Approved!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                // console.log(error);
            })
        form.reset();
    }


    const handleRejectSession = (e) => {
        e.preventDefault();
        const form = e.target;
        const reason = form.reason.value;
        const feedback = form.feedback.value;

        const updatedSession = {
            rejectionReason: reason,
            feedback
        }

        axiosSecure.patch(`/reject-session/${selectedSession._id}`, updatedSession)
            .then(res => {
                refetch();
                setSelectedSession(null);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Session Rejected Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                // console.log(error);
            })
        form.reset();
    }

    const handleChange = (e) => {
        e.preventDefault();
        setShowField(e.target.value === 'Yes')
    }

    const closeApproveModal = () => {
        const modalCheckbox = document.getElementById('approveModal');
        if (modalCheckbox) {
            modalCheckbox.checked = false;
        }
    }

    const closeRejectModal = () => {
        const modalCheckbox = document.getElementById('rejectModal');
        if (modalCheckbox) {
            modalCheckbox.checked = false;
        }
    }

    const handleDeleteSession = (id) => {
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

                axiosSecure.delete(`/session/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Session has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className="lg:w-[1200px] w-full lg:px-0 md:px-0 px-5">
            <h2 className="text-5xl text-center font-bold mb-20 mt-12">All Study Sessions: {sessions.length}</h2>

            {/* Pending Sessions */}
            <div>
                <h2 className="text-2xl font-bold mb-12">Pending Sessions:</h2>
                {
                    paginatedPending.length > 0 ? (
                        <div className="overflow-x-auto mb-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Registration Start Date</th>
                                        <th>Registration End Date</th>
                                        <th>Registration Fee</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPending.map((session, index) => (
                                        <tr key={session._id}>
                                            <td className="font-bold">{index + 1}</td>
                                            <td>{session.sessionTitle}</td>
                                            <td>
                                                {session.sessionDescription.length > maxLength
                                                    ? `${session.sessionDescription.slice(0, maxLength)}...`
                                                    : session.sessionDescription}
                                            </td>
                                            <td>{session.registrationStartDate}</td>
                                            <td>{session.registrationEndDate}</td>
                                            <td>{session.registrationFee}</td>
                                            <td>
                                                {/* The button to open modal */}
                                                <label htmlFor="approveModal" className="btn btn-sm font-bold bg-green-600 text-white hover:scale-105">
                                                    <FaCheck></FaCheck>
                                                </label>

                                                {/* Put this part before </body> tag */}
                                                <input type="checkbox" id="approveModal" className="modal-toggle" />
                                                <div className="modal" role="dialog">
                                                    <div className="modal-box">
                                                        <form onSubmit={handleApproveSession}>
                                                            <div className="mb-5">
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Title: </span>{session.sessionTitle}</p>
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Session ID: </span>{session._id}</p>
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Tutor Email: </span>{session.tutorEmail}</p>
                                                            </div>
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <div className="mb-4">
                                                                <p className="mb-2">Is The Session Free Or Paid?</p>
                                                                <select className='w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3 mb-4' name="select" id="mySelect" onChange={handleChange}>
                                                                    <option value="">Select an option</option>
                                                                    <option className="text-green-600" value="Yes">Yes</option>
                                                                    <option className="text-red-600" value="No">No</option>
                                                                </select>
                                                                {
                                                                    showField && <div className="mb-4">
                                                                        <p className="mb-2">Session Fee:</p>
                                                                        <input name="fee" defaultValue={0} className="w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" />
                                                                    </div>
                                                                }

                                                            </div>
                                                            <input onClick={() => { setSelectedSession(session); closeApproveModal(); }} type="submit" value="CONFIRM" className="btn w-full btn-outline font-bold hover:bg-black hover:text-white" />

                                                        </form>
                                                        <div className="modal-action">
                                                            <label htmlFor="approveModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {/* The button to open modal */}
                                                <label htmlFor="rejectModal" className="btn btn-sm font-bold bg-red-600 text-white hover:scale-105">
                                                    <RxCross2></RxCross2>
                                                </label>

                                                {/* Put this part before </body> tag */}
                                                <input type="checkbox" id="rejectModal" className="modal-toggle" />
                                                <div className="modal" role="dialog">
                                                    <div className="modal-box">
                                                        <form onSubmit={handleRejectSession}>
                                                            <div className="mb-5">
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Title: </span>{session.sessionTitle}</p>
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Session ID: </span>{session._id}</p>
                                                                <p className="font-bold"><span className="text-red-600 font-bold">Tutor Email: </span>{session.tutorEmail}</p>
                                                            </div>
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <div className="mb-4">
                                                                <p className="mb-2">Rejection Reason</p>
                                                                <input name="reason" className="w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Reason" />
                                                            </div>
                                                            <div className="mb-4">
                                                                <p className="mb-2">Feedback:</p>
                                                                <input name="feedback" className="w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Feedback" />
                                                            </div>
                                                            <input onClick={() => { setSelectedSession(session); closeRejectModal(); }} type="submit" value="CONFIRM" className="btn w-full btn-outline font-bold hover:bg-black hover:text-white" />

                                                        </form>
                                                        <div className="modal-action">
                                                            <label htmlFor="rejectModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination currentPage={pendingPage} totalPages={totalPendingPages} onPageChange={setPendingPage} />
                        </div>
                    ) : (
                        <h2 className="text-red-600 mb-12">No Pending Sessions Available</h2>
                    )
                }
            </div>

            {/* Approved Sessions */}
            <div>
                <h2 className="text-2xl font-bold mb-5">Approved Sessions:</h2>
                {paginatedApproved.length > 0 ? (
                    <div className="overflow-x-auto mb-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Registration Start Date</th>
                                    <th>Registration End Date</th>
                                    <th>Registration Fee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedApproved.map((session, index) => (
                                    <tr key={session._id}>
                                        <td className="font-bold">{index + 1}</td>
                                        <td>{session.sessionTitle}</td>
                                        <td>
                                            {session.sessionDescription.length > maxLength
                                                ? `${session.sessionDescription.slice(0, maxLength)}...`
                                                : session.sessionDescription}
                                        </td>
                                        <td>{session.registrationStartDate}</td>
                                        <td>{session.registrationEndDate}</td>
                                        <td>{session.registrationFee}</td>
                                        <td>
                                            <Link to={`/session/${session._id}`}>
                                                <button className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">Details</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/admin/updateSession/${session._id}`}>
                                                <button className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">
                                                    <GrUpdate />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteSession(session._id)} className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">
                                                <FaRegTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={approvedPage} totalPages={totalApprovedPages} onPageChange={setApprovedPage} />
                    </div>
                ) : (
                    <h2 className="text-red-600 mb-12">No Sessions Are Approved Yet</h2>
                )}
            </div>

            {/* Rejected Sessions */}
            <div>
                <h2 className="text-2xl font-bold mb-5">Rejected Sessions:</h2>
                {paginatedRejected.length > 0 ? (
                    <div className="overflow-x-auto mb-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Registration Start Date</th>
                                    <th>Registration End Date</th>
                                    <th>Registration Fee</th>
                                    <th>Reason:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRejected.map((session, index) => (
                                    <tr key={session._id}>
                                        <td className="font-bold">{index + 1}</td>
                                        <td>{session.sessionTitle}</td>
                                        <td>
                                            {session.sessionDescription.length > maxLength
                                                ? `${session.sessionDescription.slice(0, maxLength)}...`
                                                : session.sessionDescription}
                                        </td>
                                        <td>{session.registrationStartDate}</td>
                                        <td>{session.registrationEndDate}</td>
                                        <td>{session.registrationFee}</td>
                                        <td>{session.rejectionReason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={rejectedPage} totalPages={totalRejectedPages} onPageChange={setRejectedPage} />
                    </div>
                ) : (
                    <h2 className="text-red-600 mb-12">No Sessions Are Rejected Yet</h2>
                )}
            </div>
        </div>
    );
};


export default AllSessions;

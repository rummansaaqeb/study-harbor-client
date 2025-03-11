import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UploadMaterials = () => {
    const { user } = useAuth();
    const [selectedSession, setSelectedSession] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: sessions = [], refetch } = useQuery({
        queryKey: ['sessions', user?.email || user?.providerData[0].email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/approved-sessions/${user?.email || user?.providerData[0].email}`);
            return res.data;
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const link = form.link.value;
        const imageFile = { image: form.image.files[0] }
        // console.log(imageFile, link)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data);

        const material = {
            sessionId: selectedSession._id,
            tutorEmail: selectedSession.tutorEmail,
            image: res.data.data.display_url,
            link: link
        }

        axiosSecure.post('/materials', material)
            .then(res => {
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Material Uploaded Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });

            });
            form.reset();
    }



    const modalCheckbox = document.getElementById('my_modal_6');
    if (modalCheckbox) {
        modalCheckbox.checked = false;
    }


    return (
        <div>
            <h2 className="font-bold text-5xl mb-20 text-center">Upload Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:px-0 md:px-0 px-5">
                {
                    sessions.map(session => <div key={session._id} className="card w-96 bg-base-100 card-lg shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">{session.sessionTitle}</h2>
                            <p className="mb-2">{session.sessionDescription}</p>
                        </div>
                        <div>
                            {
                                session.status === "approved" &&
                                <>
                                    <div className="btn bg-green-600 text-white capitalize ml-7">{session.status}</div>
                                </>
                            }
                            {
                                session.status === "pending" &&
                                <>
                                    <div className="btn bg-gray-600 text-white capitalize ml-7">{session.status}</div>
                                </>
                            }
                            {
                                session.status === "rejected" &&
                                <>
                                    <div className='flex items-center'>
                                        <div className="btn bg-red-600 text-white capitalize ml-7">{session.status}</div>
                                        <button onClick={handleUpdateStatus} className='btn btn-outline font-bold hover:bg-black hover:text-white'>
                                            <FaRedo></FaRedo>
                                        </button>
                                    </div>
                                </>
                            }

                        </div>
                        <div className="justify-end card-actions">
                            {/* The button to open modal */}
                            <label htmlFor="my_modal_6" className="btn btn-primary mr-7 mb-7">Upload</label>

                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                            <div className="modal" role="dialog">
                                <div className="modal-box">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <p className="font-bold"><span className="text-red-600 font-bold">Title: </span>{session.sessionTitle}</p>
                                            <p className="font-bold"><span className="text-red-600 font-bold">Session ID: </span>{session._id}</p>
                                            <p className="font-bold"><span className="text-red-600 font-bold">Tutor Email: </span>{session.tutorEmail}</p>
                                        </div>
                                        {/* if there is a button in form, it will close the modal */}
                                        <div className="mb-4">
                                            <p className="mb-2">Upload Image:</p>
                                            <input name="image" type="file" className="file-input" />
                                        </div>
                                        <div className="mb-4">
                                            <p className="mb-2">Google Drive Link:</p>
                                            <input name="link" className="w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Google Drive Link" />
                                        </div>
                                        <button onClick={() => setSelectedSession(session)} type="submit" className="btn w-full btn-outline font-bold hover:bg-black hover:text-white">UPLOAD</button>

                                    </form>
                                    <div className="modal-action">
                                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default UploadMaterials;
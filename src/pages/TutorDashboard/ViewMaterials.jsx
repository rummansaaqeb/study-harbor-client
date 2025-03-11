import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const ViewMaterials = () => {

    const { user } = useAuth();
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { data: materials = [], refetch } = useQuery({
        queryKey: ['materials', user?.email || user?.providerData[0].email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials/${user?.email || user?.providerData[0].email}`);
            return res.data;
        }
    });


    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        const updatedMaterial = {
            link: data.link,
        }


        if (data.image?.[0]) {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' },
            });
            updatedMaterial.image = res.data.data.display_url;
        }
        else if (selectedMaterial?.image) {
            updatedMaterial.image = selectedMaterial.image;
        }



        axiosSecure.patch(`/material/${selectedMaterial._id}`, updatedMaterial)
            .then(res => {
                // console.log('success', res.data);
                refetch();
                reset();
                setSelectedMaterial(null)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Material Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    const modalCheckbox = document.getElementById('my_modal_6');
    if (modalCheckbox) {
        modalCheckbox.checked = false;
    }


    const handleDeleteMaterial = id => {
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
                    axiosSecure.delete(`/material/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Material Deleted Successfully",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        }

    return (
        <div className="mb-24">
            <h2 className="text-5xl text-center font-bold mb-20">View Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:px-0 md:px-0 px-5">
                {
                    materials.map(material => <div key={material._id} className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                className="w-full h-[300px] object-cover"
                                src={material?.image}
                                alt="Material" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Added By: {material.tutorEmail}</h2>
                            <p>Study Session Id: {material.sessionId}</p>
                            <div>
                                <span className="text-red-600 mr-3">Material Link:</span>
                                <a className="underline font-bold text-black" href={material.link} target="_blank">View Material</a>
                            </div>
                            <div className="mt-6 card-actions justify-between">
                                {/* The button to open modal */}
                                <label htmlFor="my_modal_6" className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white">
                                    <GrUpdate></GrUpdate>
                                </label>

                                {/* Put this part before </body> tag */}
                                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {/* if there is a button in form, it will close the modal */}
                                            <div className="mb-4">
                                                <p className="mb-2">Upload Image:</p>
                                                <input {...register('image')} type="file" className="file-input" />
                                            </div>
                                            <div className="mb-4">
                                                <p className="mb-2">Google Drive Link:</p>
                                                <input {...register('link')} className="w-full border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3" type="text" placeholder="Google Drive Link" defaultValue={material.link} />
                                            </div>
                                            <input onClick={() => setSelectedMaterial(material)} type="submit" value="UPDATE" className="btn w-full btn-outline font-bold hover:bg-black hover:text-white" />

                                        </form>
                                        <div className="modal-action">
                                            <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteMaterial(material._id)} className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white">
                                    <FaRegTrashAlt></FaRegTrashAlt>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ViewMaterials;
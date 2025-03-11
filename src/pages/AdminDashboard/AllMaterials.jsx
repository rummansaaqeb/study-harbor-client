import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";

const AllMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const {data: materials = [], refetch} = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const res = await axiosSecure.get('/materials');
            return res.data;
        }
    })

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
        <div>
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
                            <div className="mt-6 card-actions justify-end">
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

export default AllMaterials;
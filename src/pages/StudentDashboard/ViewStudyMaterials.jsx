import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ViewStudyMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookedSessions = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['bookedSessions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedSessions/${user?.email || user?.providerData?.[0]?.email}`);
            return res.data;
        }
    });


    const sessionIds = bookedSessions.length > 0 ? bookedSessions.map(session => session.sessionId).join(',') : null;

    const { data: studyMaterials = [], isLoading: materialsLoading, error: materialsError } = useQuery({
        queryKey: ['studyMaterials', sessionIds],
        queryFn: async () => {
            const res = await axiosSecure.get(`/studyMaterials?sessionIds=${sessionIds}`);
            return res.data;
        },
    });

    // console.log(studyMaterials)

    return (
        <div className="mb-24">
            <h2 className="text-center text-5xl font-bold mt-12 mb-20">View Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-5 gap-8 mt-12 lg:ml-24 lg:px-0 md:px-0 px-5">
                {
                    studyMaterials.map(material => <div key={material._id} className="card bg-base-100 w-96 shadow-sm">
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
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ViewStudyMaterials;

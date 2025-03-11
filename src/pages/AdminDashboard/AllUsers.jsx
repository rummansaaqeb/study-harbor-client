import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const [search, setSearch] = useState('');
    const [delayedSearch, setDelayedSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', delayedSearch],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?search=${delayedSearch}`);
            return res.data;
        }
    })

    const handleRoleUpdate = (e, id) => {
        const data = {
            role: e.target.value
        }
        axiosSecure.patch(`/user/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Role Has Been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setDelayedSearch(search);
            setLoading(false);
        }, 500);


        return () => {
            clearTimeout(timer);
            setLoading(false);
        };
    }, [search]);


    return (
        <div className="lg:w-[1000px] w-full lg:px-0 md:px-0 px-5">
            <h2 className="text-5xl text-center mb-20 font-bold">All Users</h2>
            <div className="w-full flex items-center justify-center mb-6">
                <label className="input text-center w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" onChange={handleSearchChange} value={search} className="grow" placeholder="Search" />
                </label>
            </div>
            {
                loading === true ?
                    <div className="flex flex-col justify-center items-center">
                        <span className="block mt-24 loading loading-bars loading-xl"></span>
                    </div>
                    :
                    users.length === 0 ?
                        <div>
                            <h2 className="text-xl text-center text-red-600">No users found!</h2>
                        </div>
                        :
                        <div className="w-full overflow-x-auto mt-12">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <th className="capitalize text-red-600 font-bold">{user?.role}</th>
                                                <th>
                                                    <select onChange={(e) => handleRoleUpdate(e, user._id)} defaultValue={user?.role} name="" id="">
                                                        <option value="student">Student</option>
                                                        <option value="tutor">Tutor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </th>
                                                <th>
                                                    <button className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white">
                                                        <FaRegTrashAlt></FaRegTrashAlt>
                                                    </button>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
            }
        </div>
    );
};

export default AllUsers;
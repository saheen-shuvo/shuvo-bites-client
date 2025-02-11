/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allusers = [], refetch } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allusers");
      return res.data;
    },
  });

  const handleMakeAdmin = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/allusers/admin/${user._id}`).then(res => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user.name} is an Admin Now!`,
              icon: "success",
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/allusers/${user._id}`).then((res) => {
          refetch();
          if (res.data.deleteCount > 1) {
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-2xl font-semibold">All Users</h2>
        <h2 className="text-2xl font-semibold">
          Total Users: {allusers.length}
        </h2>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td className="font-semibold">{user.name}</td>
                <td className="font-semibold">{user.email}</td>
                <th>
                  {
                    user.role === 'admin' ? 'Admin' :
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-3xl text-yellow-700"
                    >
                      <FaUsers />
                    </button>
                  }
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-3xl text-red-600"
                  >
                    <MdDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/Animation - 1742381715655.json";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allusers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allusers");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
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
        axiosSecure.patch(`/allusers/admin/${user._id}`).then((res) => {
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
          if (res.data.deletedCount > 0) {
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
    <div className="pt-4 md:pt-8">
      <div className="flex justify-evenly mb-8">
        <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto">
          ALL USERS
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center my-16">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              className="w-24 h-24"
            />
          </div>
        </>
      ) : (
        <>
          {/* TABLE FOR LARGE SCREEN*/}
          <div className="overflow-x-auto hidden md:block">
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
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="text-3xl text-yellow-700"
                        >
                          <FaUsers />
                        </button>
                      )}
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

          {/* TABLE FOR SMALL SCREEN */}
          <div className="overflow-x-auto block md:hidden">
            {allusers.map((user, index) => (
              <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                <tbody>
                  <tr>
                    <th>Serial</th>
                    <td>{index + 1}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>
                      {" "}
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="text-3xl text-yellow-700"
                        >
                          <FaUsers />
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Action</th>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-3xl text-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;

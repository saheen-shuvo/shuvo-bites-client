/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.photoURL);
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = response.data.data.url;
      setImageUrl(uploadedImageUrl);

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        await updateProfile(currentUser, {
          photoURL: uploadedImageUrl,
        });
        await currentUser.reload();
        toast.success("Profile picture updated successfully!");
      } else {
        toast.warn("User Not Found!");
      }
    } catch (error) {
      console.error("Error uploading image or updating profile:", error);
      toast.warn("Error Uploading Image!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-52 border-dashed font-semibold border-gray-400 mx-auto my-8">
        MY PROFILE
      </div>
      {/* DETAILS */}
      <div>
        {/* img */}
        <div className="flex justify-center mt-4">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={user?.photoURL}
            alt=""
          />
        </div>
        <h6 className="font-semibold text-lg text-yellow-500 text-center">
          {user?.displayName}
        </h6>
      </div>
      <div className="flex flex-col gap-2 font-semibold">
        <p className="mt-4">Email: {user?.email}</p>
        <p className="">
          Phone: {user?.phoneNumber ? user?.phoneNumber : "Not Provided"}
        </p>
        <p className="">Account Created: {user?.metadata.creationTime}</p>
        <p className="">Last Login: {user?.metadata.lastSignInTime}</p>
        <p className="">
          Email Verified: {user?.metadata.emailVerified ? "Yes" : "No"}
        </p>
        <p className="">Update Profile Picture :</p>
        {/* File input for uploading new profile image */}
        <div className="mt-4">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
          {loading && (
            <p className="mt-2 text-center text-yellow-500">Uploading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

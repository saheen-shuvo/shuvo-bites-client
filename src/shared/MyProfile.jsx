import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const MyProfile = () => {
  const { user } = useAuth();
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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        MY PROFILE
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-4">
        <img
          className="w-32 h-32 object-cover rounded-full border-4 border-indigo-600 shadow-lg"
          src={imageUrl || "/default-avatar.png"}
          alt="Profile"
        />
      </div>

      {/* Display User Info */}
      <div className="text-center mt-4">
        <h6 className="text-xl font-semibold text-gray-900">{user?.displayName}</h6>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Account Details */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Phone:</span>
          <span>{user?.phoneNumber || "Not Provided"}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Account Created:</span>
          <span>{new Date(user?.metadata.creationTime).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Last Login:</span>
          <span>{new Date(user?.metadata.lastSignInTime).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Email Verified:</span>
          <span>{user?.metadata.emailVerified ? "Yes" : "No"}</span>
        </div>
      </div>

      {/* Update Profile Picture */}
      <div className="mt-6">
        <label className="block text-gray-700 font-semibold mb-2">Update Profile Picture:</label>
        <div className="flex justify-center">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs border-gray-300 focus:border-indigo-600"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        {loading && (
          <p className="mt-2 text-center text-yellow-500">Uploading...</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

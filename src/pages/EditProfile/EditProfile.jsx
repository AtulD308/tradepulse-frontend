import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: auth.user?.fullName || "",
    dateOfBirth: auth.user?.dateOfBirth || "",
    nationality: auth.user?.nationality || "",
    address: auth.user?.address || "",
    city: auth.user?.city || "",
    postcode: auth.user?.postcode || "",
    country: auth.user?.country || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateProfile({
        jwt: localStorage.getItem("jwt"),
        userData: formData,
        navigate,
      })
    );
  };

  return (
    <div className="min-h-screen px-6 md:px-10 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 border-b border-gray-700 pb-5">
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Update your personal information and address details.
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-300">
                  Date Of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="nationality" className="text-sm font-medium text-gray-300">
                  Nationality
                </label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Enter your nationality"
                  className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-300">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="city" className="text-sm font-medium text-gray-300">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="postcode" className="text-sm font-medium text-gray-300">
                  Postcode
                </label>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="Postcode"
                  className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-sm font-medium text-gray-300">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-4 py-2.5 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-md border border-gray-600 text-gray-200 hover:bg-gray-800 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-md bg-white text-black hover:bg-gray-200 transition text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    phoneNumber: "",
    postalCode: "",
    country: "",
    type: "",
  });
  const [addressExists, setAddressExists] = useState(false); // To track if address exists
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileData(currentUser);
  
      // Fetch the existing address data when the component mounts
      const fetchAddress = async () => {
        try {
          const response = await fetch(`/backend/address/getByUserId/${currentUser._id}`);
          const data = await response.json();
          console.log(data[0].street);
  
          // Make sure the correct data structure is being used
          if (response.ok && data) {
            setFormData({
              street: data[0].street || "",
              city: data[0].city || "",
              state: data[0].state || "",
              phoneNumber: data[0].phoneNumber || "",
              postalCode: data[0].postalCode || "",
              country: data[0].country || "",
              type: data[0].type || "",
            });
            setAddressExists(true); // Set true if address data exists
          }
        } catch (error) {
          setErrorMessage("Failed to fetch address data.");
        }
      };
  
      fetchAddress();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = addressExists
      ? `/backend/address/updateById/${currentUser._id}` // If address exists, call update API
      : `/backend/address/create`; // If no address exists, call create API

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: currentUser._id, // Assuming profileData contains the user ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      setSuccessMessage(
        addressExists ? "Address updated successfully!" : "Address added successfully!"
      );
      setErrorMessage("");
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Account</h1>

          {profileData ? (
            <>
              <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <img
                      src={profileData.avatarUrl || "https://via.placeholder.com/100"}
                      alt="Profile Picture"
                      className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-600 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.username || ""}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email || ""}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled
                        />
                      </div>

                      {formData.street && (
                        <>
                          <div>
                            <label className="block text-gray-600 mb-2">Street</label>
                            <input
                              type="text"
                              value={formData.street}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">City</label>
                            <input
                              type="text"
                              value={formData.city}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">State</label>
                            <input
                              type="text"
                              value={formData.state}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">Phone Number</label>
                            <input
                              type="text"
                              value={formData.phoneNumber}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">Postal Code</label>
                            <input
                              type="text"
                              value={formData.postalCode}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">Country</label>
                            <input
                              type="text"
                              value={formData.country}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-2">Type</label>
                            <input
                              type="text"
                              value={formData.type}
                              className="w-full p-2 border border-gray-300 rounded"
                              disabled
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {showForm ? (
                <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {addressExists ? "Update Information" : "Add More Information"}
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-600 mb-2">Street</label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Phone Number</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Type</label>
                        <input
                          type="text"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded mt-6 hover:bg-blue-700"
                    >
                      {addressExists ? "Update" : "Submit"}
                    </button>
                  </form>
                  {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                  {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                </section>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  {addressExists ? "Update Information" : "Add More Information"}
                </button>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;

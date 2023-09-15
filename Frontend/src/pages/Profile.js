import React, { useContext, useState } from "react";
import AuthContext from "../AuthContext";

const Profile = () => {
  const authContext = useContext(AuthContext);

  const localStorageData = JSON.parse(localStorage.getItem("user"));

  // Sample user data
  const [user] = useState({
    firstName: localStorageData.firstName,
    lastName: localStorageData.lastName,
    email: localStorageData.email,
    phoneNumber: localStorageData.phoneNumber,
  });

  return (
   
      <div className="col-span-12 lg:col-span-10  flex justify-center">
        <div className=" flex flex-col gap-5 w-11/12">
          <div className="bg-white rounded p-3">
            <h1 className="text-2xl font-semibold mt-4">
              {user.firstName} {user.lastName}
            </h1>

            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  First Name:
                </label>
                <p className="text-gray-900">{user.firstName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Last Name:
                </label>
                <p className="text-gray-900">{user.lastName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Phone Number:
                </label>
                <p className="text-gray-900">{user.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;

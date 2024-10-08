// profileDetails.js
import React from "react";
import { useState, useEffect } from "react";

function ProfileDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://full-stack-pwa-api.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching users: ", error);
      });
  }, []);

  console.log("users: ", users);

  if (users.length === 0) {
    return <div className="text-lg my-4">No users available</div>;
  }

  // if (!users) {
  //   return <div className="text-lg my-4">No users details available</div>;
  // }

  return (
    <>
      <h2 className="text-center text-cyan-300 my-4">User Details</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto m-4 p-2">
        {users.map((user) => (
          <div key={user._id} className="font-sans border-2 border-gray-600 rounded-md p-2">
            <div className="flex-none w-full relative h-48">
              <img
                src={`http://localhost:8000/${user.image?.filename}`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-auto p-2">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                  Name: {user.name}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                  Mobile No: {user.mobile}
                </div>
                <div className="w-full flex-none text-sm font-medium text-slate-700 my-4">
                  Email: {user.email}
                </div>
              </div>
              <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                    type="button"
                  >
                    Age: {user.age}
                  </button>
                  <button
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                    type="button"
                  >
                    Qualification: {user.qualification}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-700">Address: {user.address}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
}

export default ProfileDetails;

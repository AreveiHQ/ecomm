import React, { useEffect, useState } from "react";
import axios from "axios";
const server = import.meta.env.VITE_BACKEND_SERVER;

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    //localhost:3000/api/v1/admin/users
    http: axios
      .get(`http://localhost:3000/api/v1/admin/users`)
      .then((response) => {
        setUsers(response.data); // Set the user data
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="usersPage p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All User Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left ">Name</th>
              <th className="px-4 py-2 text-left ">Email</th>
              <th className="px-4 py-2 text-left ">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;

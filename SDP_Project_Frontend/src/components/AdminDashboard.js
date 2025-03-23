// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [users, setUsers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
  
//   // Function to handle sidebar navigation
//   const handleNavigation = (tab) => {
//     setActiveTab(tab);
//     if (tab === "users") {
//       fetchUsers();
//     }
//     if (tab === "properties") {
//       fetchProperties();
//     }
//     if (tab === "payments") {
//       fetchPayments();
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     localStorage.removeItem('profileImage');
//     localStorage.removeItem('role');
    
//     // Redirect to home page
//     navigate('/login', { replace: true });
//   };

//   // Fetch all users
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//       const response = await axios.get("http://localhost:5000/api/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(response.data.users);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch users");
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all properties
//   const fetchProperties = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5000/api/getProperty",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProperties(response.data.properties);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch properties");
//       console.error("Error fetching properties:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all payments
//   const fetchPayments = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5000/api/payments/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPayments(response.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch payments");
//       console.error("Error fetching payments:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete user function
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update users list after successful deletion
//       setUsers(users.filter((user) => user._id !== userId));
//       alert("User deleted successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to delete user");
//       console.error("Error deleting user:", err);
//     }
//   };

//   // Delete property function
//   const handleDeleteProperty = async (propertyId) => {
//     if (!window.confirm("Are you sure you want to delete this property?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/properties/${propertyId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update properties list after successful deletion
//       setProperties(
//         properties.filter((property) => property._id !== propertyId)
//       );
//       alert("Property deleted successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to delete property");
//       console.error("Error deleting property:", err);
//     }
//   };

//   // Load data when the component mounts based on active tab
//   useEffect(() => {
//     if (activeTab === "users") {
//       fetchUsers();
//     } else if (activeTab === "properties") {
//       fetchProperties();
//     } else if (activeTab === "payments") {
//       fetchPayments();
//     }
//   }, [activeTab]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white">
//         <div className="p-4 font-bold text-xl">Admin Panel</div>
//         <nav className="mt-6">
//           <ul>
//             <li className="mb-2">
//               <button
//                 onClick={() => handleNavigation("dashboard")}
//                 className={`flex items-center w-full px-4 py-2 ${
//                   activeTab === "dashboard"
//                     ? "bg-gray-700"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="mr-2">📊</span> Dashboard
//               </button>
//             </li>
//             <li className="mb-2">
//               <button
//                 onClick={() => handleNavigation("users")}
//                 className={`flex items-center w-full px-4 py-2 ${
//                   activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="mr-2">👥</span> Users
//               </button>
//             </li>
//             <li className="mb-2">
//               <button
//                 onClick={() => handleNavigation("properties")}
//                 className={`flex items-center w-full px-4 py-2 ${
//                   activeTab === "properties"
//                     ? "bg-gray-700"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="mr-2">🏠</span> Properties
//               </button>
//             </li>
//             <li className="mb-2">
//               <button
//                 onClick={() => handleNavigation("payments")}
//                 className={`flex items-center w-full px-4 py-2 ${
//                   activeTab === "payments"
//                     ? "bg-gray-700"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="mr-2">💰</span> Payments
//               </button>
//             </li>
//           </ul>
//         </nav>
//         <div className="absolute bottom-0 w-64 p-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-gray-700"
//           >
//             <span className="mr-2">🚪</span> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto">
//         {activeTab === "dashboard" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-white p-4 rounded shadow">
//                 <h2 className="font-bold text-gray-500">Total Users</h2>
//                 <p className="text-2xl">1,254</p>
//               </div>
//               <div className="bg-white p-4 rounded shadow">
//                 <h2 className="font-bold text-gray-500">Total Properties</h2>
//                 <p className="text-2xl">342</p>
//               </div>
//               <div className="bg-white p-4 rounded shadow">
//                 <h2 className="font-bold text-gray-500">Active Listings</h2>
//                 <p className="text-2xl">189</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "users" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Users Management</h1>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}
//             <div className="bg-white p-4 rounded shadow">
//               {loading ? (
//                 <p className="text-center py-4">Loading users...</p>
//               ) : (
//                 <table className="min-w-full">
//                   <thead>
//                     <tr>
//                       <th className="text-left p-2">ID</th>
//                       <th className="text-left p-2">Name</th>
//                       <th className="text-left p-2">Email</th>
//                       <th className="text-left p-2">Role</th>
//                       <th className="text-left p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? (
//                       users.map((user) => (
//                         <tr key={user._id} className="border-t">
//                           <td className="p-2">{user._id.substring(0, 6)}...</td>
//                           <td className="p-2">{user.username}</td>
//                           <td className="p-2">{user.email}</td>
//                           <td className="p-2">{user.role}</td>
//                           <td className="p-2">
//                             <button
//                               onClick={() => handleDeleteUser(user._id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center py-4">
//                           No users found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "properties" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Properties Management</h1>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}
//             <div className="bg-white p-4 rounded shadow overflow-x-auto">
//               {loading ? (
//                 <p className="text-center py-4">Loading properties...</p>
//               ) : (
//                 <table className="min-w-full">
//                   <thead>
//                     <tr>
//                       <th className="text-left p-2">ID</th>
//                       <th className="text-left p-2">Name</th>
//                       <th className="text-left p-2">Type</th>
//                       <th className="text-left p-2">City</th>
//                       <th className="text-left p-2">Status</th>
//                       <th className="text-left p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {properties.length > 0 ? (
//                       properties.map((property) => (
//                         <tr key={property._id} className="border-t">
//                           <td className="p-2">
//                             {property._id.substring(0, 6)}...
//                           </td>
//                           <td className="p-2">{property.title || "N/A"}</td>
//                           <td className="p-2 capitalize">{property.type}</td>
//                           <td className="p-2">{property.address || "N/A"}</td>
//                           <td className="p-2">
//                             <span
//                               className={`px-2 py-1 rounded text-xs ${
//                                 property.status === "active"
//                                   ? "bg-green-100 text-green-800"
//                                   : property.status === "pending"
//                                     ? "bg-yellow-100 text-yellow-800"
//                                     : "bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               {property.status || "N/A"}
//                             </span>
//                           </td>
//                           <td className="p-2">
//                             <button
//                               onClick={() => handleDeleteProperty(property._id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="text-center py-4">
//                           No properties found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "payments" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Payments Management</h1>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}
//             <div className="bg-white p-4 rounded shadow overflow-x-auto">
//               {loading ? (
//                 <p className="text-center py-4">Loading payments...</p>
//               ) : (
//                 <table className="min-w-full">
//                   <thead>
//                     <tr>
//                       <th className="text-left p-2">Payment ID</th>
//                       <th className="text-left p-2">Username</th>
//                       <th className="text-left p-2">Owner Name</th>
//                       <th className="text-left p-2">Property Name</th>
//                       <th className="text-left p-2">Payment Type</th>
//                       <th className="text-left p-2">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payments.length > 0 ? (
//                       payments.map((payment) => (
//                         <tr key={payment._id} className="border-t">
//                           <td className="p-2">
//                             {payment._id.substring(0, 6)}...
//                           </td>
//                           <td className="p-2">
//                             {payment.userId?.username || "N/A"}
//                           </td>
//                           <td className="p-2">
//                             {payment.ownerId?.username || "N/A"}
//                           </td>
//                           <td className="p-2">
//                             {payment.propertyId?.title || "N/A"}
//                           </td>
//                           <td className="p-2 capitalize">
//                             {payment.paymentType || "N/A"}
//                           </td>
//                           <td className="p-2">
//                             ${payment.amount?.toFixed(2) || "0.00"}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="text-center py-4">
//                           No payments found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;









import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PropertyPieChart from "./PropertyPieChart";
import FeedbackBarGraph from "./FeedbackBarGraph";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Function to handle sidebar navigation
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "users") {
      fetchUsers();
    }
    if (tab === "properties") {
      fetchProperties();
    }
    if (tab === "payments") {
      fetchPayments();
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('role');
    
    // Redirect to home page
    navigate('/login', { replace: true });
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all properties
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/getProperty",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProperties(response.data.properties);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch properties");
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all payments
  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/payments/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayments(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch payments");
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user function
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update users list after successful deletion
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
      console.error("Error deleting user:", err);
    }
  };

  // Delete property function
  // const handleDeleteProperty = async (propertyId) => {
  //   if (!window.confirm("Are you sure you want to delete this property?")) {
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.delete(`http://localhost:5000/api/properties/${propertyId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // Update properties list after successful deletion
  //     setProperties(
  //       properties.filter((property) => property._id !== propertyId)
  //     );
  //     alert("Property deleted successfully");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to delete property");
  //     console.error("Error deleting property:", err);
  //   }
  // };

  // Load data when the component mounts based on active tab
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "properties") {
      fetchProperties();
    } else if (activeTab === "payments") {
      fetchPayments();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-xl">Admin Panel</div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => handleNavigation("dashboard")}
                className={`flex items-center w-full px-4 py-2 ${
                  activeTab === "dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">📊</span> Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleNavigation("users")}
                className={`flex items-center w-full px-4 py-2 ${
                  activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">👥</span> Users
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleNavigation("properties")}
                className={`flex items-center w-full px-4 py-2 ${
                  activeTab === "properties"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">🏠</span> Properties
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleNavigation("payments")}
                className={`flex items-center w-full px-4 py-2 ${
                  activeTab === "payments"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">💰</span> Payments
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-gray-700"
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>            
            {/* PropertyPieChart component */}
            <div className="mb-8">
              <PropertyPieChart />
            </div>
            
            {/* FeedbackBarGraph component */}
            <div>
              <FeedbackBarGraph />
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Users Management</h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="bg-white p-4 rounded shadow">
              {loading ? (
                <p className="text-center py-4">Loading users...</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-center p-2">ID</th>
                      <th className="text-center p-2">Name</th>
                      <th className="text-center p-2">Email</th>
                      <th className="text-center p-2">Role</th>
                      <th className="text-center p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id} className="border-t">
                          <td className="p-2">{user._id}</td>
                          <td className="p-2">{user.username}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">{user.role}</td>
                          <td className="p-2">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Properties Management</h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
              {loading ? (
                <p className="text-center py-4">Loading properties...</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-center p-2">ID</th>
                      <th className="text-center p-2">Name</th>
                      <th className="text-center p-2">Type</th>
                      <th className="text-center p-2">City</th>
                      <th className="text-center p-2">Status</th>
                      {/* <th className="text-left p-2">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {properties.length > 0 ? (
                      properties.map((property) => (
                        <tr key={property._id} className="border-t">
                          <td className="p-2">
                            {property._id}
                          </td>
                          <td className="p-2">{property.title || "N/A"}</td>
                          <td className="p-2 capitalize">{property.type}</td>
                          <td className="p-2">{property.address || "N/A"}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                property.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : property.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {property.status || "N/A"}
                            </span>
                          </td>
                          {/* <td className="p-2">
                            <button
                              onClick={() => handleDeleteProperty(property._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No properties found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Payments Management</h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
              {loading ? (
                <p className="text-center py-4">Loading payments...</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-center p-2">Payment ID</th>
                      <th className="text-center p-2">Username</th>
                      <th className="text-center p-2">Owner Name</th>
                      {/* <th className="text-left p-2">Property Name</th> */}
                      <th className="text-center p-2">Payment Type</th>
                      <th className="text-center p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length > 0 ? (
                      payments.map((payment) => (
                        <tr key={payment._id} className="border-t">
                          <td className="p-2">
                            {payment._id/*.substring(0, 6)*/}
                          </td>
                          <td className="p-2">
                            {payment.userId?.username || "N/A"}
                          </td>
                          <td className="p-2">
                            {payment.ownerId?.username || "N/A"}
                          </td>
                          {/* <td className="p-2">
                            {payment.propertyId?.title || "N/A"}
                          </td> */}
                          <td className="p-2 capitalize">
                            {payment.paymentType || "N/A"}
                          </td>
                          <td className="p-2">
                            ${payment.amount?.toFixed(2) || "0.00"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No payments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
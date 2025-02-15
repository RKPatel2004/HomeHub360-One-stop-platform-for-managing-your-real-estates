import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-deepPurple-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Owner Home</h1>
      <div>
        <Link to="/owner/dashboard" className="px-4">Dashboard</Link>
        <Link to="/owner/submit-property" className="px-4">Submit Property</Link>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Your Properties</h2>
      <p className="mt-4">List of properties owned by the user will be displayed here.</p>
    </div>
  );
};

const SubmitProperty = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Submit a New Property</h2>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="Property Name" className="border p-2 w-full" />
        <input type="text" placeholder="Location" className="border p-2 w-full" />
        <input type="number" placeholder="Price" className="border p-2 w-full" />
        <button type="submit" className="bg-deepPurple-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

const OwnerHome = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/submit-property" element={<SubmitProperty />} />
      </Routes>
    </Router>
  );
};

export default OwnerHome;

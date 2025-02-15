import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProperty.css';

const ManageProperty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="manage-property">
      <h1>Manage Your Properties</h1>
      {/* Add your property management content here */}
    </div>
  );
};

export default ManageProperty;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookProperty.css';

const BookProperty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="book-property">
      <h1>Book a Property</h1>
      {/* Add your property booking content here */}
    </div>
  );
};

export default BookProperty;
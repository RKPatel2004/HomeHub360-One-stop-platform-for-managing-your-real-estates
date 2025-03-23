import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import { useDispatch  , useSelector } from 'react-redux';
import { AddUser } from '../../redux/reducer/loginslice';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.User)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam && (roleParam === 'owner' || roleParam === 'customer')) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === 'role' && location.search.includes('role=')) {
      return;
    }
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setSuccess(response.data.message);
      const usr = {
        username: formData.username,
        role:formData.role,
        token:response.data.token,
        uid:response.data._id
      }
      
      dispatch(AddUser(usr))
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  const isRolePreset = location.search.includes('role=');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us and start your journey</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@example.com"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isRolePreset}
              required
            >
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="signup-link">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

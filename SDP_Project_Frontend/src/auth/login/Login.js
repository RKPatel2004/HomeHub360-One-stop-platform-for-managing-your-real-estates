import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useDispatch  /*, useSelector*/ } from 'react-redux';
import { AddUser } from '../../redux/reducer/loginslice';

const Login = () => {
  const navigate = useNavigate();
  //const user = useSelector(state => state.User);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(/*'http://localhost:5000/api/login'*/'https://homehub360.onrender.com/api/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);
      localStorage.setItem('profileImage', user.profilePic);

      // Check if the user is an admin and navigate accordingly
      
      localStorage.setItem('userId', response.data.user._id);
      const usr = {
        username: response.data.user.username,
        role:response.data.user.role,
        token:response.data.token,
        uid:response.data.user._id
      }
      dispatch(AddUser(usr))
      if (user.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/'); // Redirect to normal user home
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
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
          </div>

          <div className="form-field">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <div className="input-container">
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
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link to="/signup" className="signup-link">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

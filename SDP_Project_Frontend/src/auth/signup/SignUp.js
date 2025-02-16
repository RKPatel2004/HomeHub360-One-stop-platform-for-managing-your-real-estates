// // SignUp.js
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './SignUp.css';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phone: '',
//     role: 'customer'
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const roleParam = params.get('role');
//     if (roleParam && (roleParam === 'owner' || roleParam === 'customer')) {
//       setFormData(prev => ({ ...prev, role: roleParam }));
//     }
//   }, [location]);

//   const handleChange = (e) => {
//     const { name } = e.target;
//     // Prevent role from being changed if it was set via URL parameter
//     if (name === 'role' && location.search.includes('role=')) {
//       return;
//     }
//     setFormData({
//       ...formData,
//       [name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/register', formData);
//       setSuccess(response.data.message);

//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred during signup');
//     }
//   };

//   const isRolePreset = location.search.includes('role=');

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2>Create Account</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone (10 digits)"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               disabled={isRolePreset}
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="owner">Owner</option>
//             </select>
//           </div>

//           {error && <div className="error-message">{error}</div>}
//           {success && <div className="success-message">{success}</div>}

//           <button type="submit" className="signup-button">
//             Sign Up
//           </button>
//         </form>

//         <div className="login-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;












import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

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
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (10 digits)"
              required
            />
          </div>

          <div className="form-group">
            <select
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

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
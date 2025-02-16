import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '/images/logo192.png');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [originalFormData, setOriginalFormData] = useState({ ...formData });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageEditMode, setImageEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      jwtDecode(token);
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/profileDetails/getUserProfile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data;
          const updatedFormData = {
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            password: '',
          };
          
          setFormData(updatedFormData);
          setOriginalFormData(updatedFormData);
          
          if (userData.profilePic) {
            setProfileImage(userData.profilePic);
            localStorage.setItem('profileImage', userData.profilePic);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            navigate('/login');
          }
        }
      };

      fetchUserData();
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);
        setImageEditMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      // if (formData.password) {
      //   formDataToSend.append('password', formData.password);
      // }

      if (profileImage && profileImage.startsWith('data:')) {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formDataToSend.append('profilePic', file);
      }

      const response = await axios.put(
        'http://localhost:5000/api/updateUser/updateProfile',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // Update localStorage with new profile data
        localStorage.setItem('username', formData.username);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('phone', formData.phone);
        if (profileImage) {
          localStorage.setItem('profileImage', response.data.updatedUser.profilePic);
        }
        
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData(originalFormData);
    setProfileImage(localStorage.getItem('profileImage') || '/images/logo192.png');
    setError('');
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <button className="back-to-home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <img src={profileImage} className="profile-image-preview" />
            <div className="edit-profile-icon" onClick={() => setImageEditMode(!imageEditMode)}>
              <i className="fas fa-edit"></i>
            </div>
          </div>

          {imageEditMode && (
            <div className="image-upload-overlay">
              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload-input"
              />
              <label htmlFor="profile-image-upload" className="image-upload-label">
                Choose Image
              </label>
            </div>
          )}
        </div>

        {showSuccessMessage && <div className="success-message">Profile Updated Successfully</div>}
        {error && <div className="error-message">{error}</div>}

        <form className="profile-form" onSubmit={handleEditProfile}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="edit-profile-btn">
              Update Profile
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
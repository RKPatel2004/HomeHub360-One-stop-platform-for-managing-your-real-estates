import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';


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
  const user = useSelector(state => state.User);

  useEffect(() => {
    const token = user.token;
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
      const token = user.token;
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
    <div className="max-w-lg mx-auto p-8 bg-[#f7f9fc] min-h-screen flex flex-col">
      <div className="flex justify-end mb-8">
        <button 
          className="py-2 px-4 bg-[#3498db] text-white border-none rounded-xl cursor-pointer transition duration-300 hover:scale-105"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative w-[200px] h-[200px]">
            <img 
              src={profileImage} 
              alt=""
              className="w-[200px] h-[200px] rounded-full object-cover border-4 border-[#3498db]"
            />
            <div 
              className="absolute bottom-[10px] right-[10px] bg-[#3498db] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition duration-300 hover:scale-110"
              onClick={() => setImageEditMode(!imageEditMode)}
            >
              <i className="fas fa-edit"></i>
            </div>
          </div>
          {imageEditMode && (
            <div className="mt-4 text-center">
              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label 
                htmlFor="profile-image-upload" 
                className="bg-[#2ecc71] text-white py-2 px-4 rounded-xl cursor-pointer transition duration-300 hover:bg-[#27ae60]"
              >
                Choose Image
              </label>
            </div>
          )}
        </div>
        {showSuccessMessage && (
          <div className="text-center bg-[#2ecc71] text-white p-[10px] rounded-xl mb-4 animate-[fadeIn_0.5s]">
            Profile Updated Successfully
          </div>
        )}
        {error && <div className="text-center bg-red-500 text-white p-[10px] rounded-xl mb-4">{error}</div>}
        <form className="flex flex-col gap-6" onSubmit={handleEditProfile}>
          <div className="flex flex-col">
            <label className="mb-2 text-[#2c3e50] font-semibold">Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleInputChange}
              required 
              className="py-3 px-3 border border-[#e0e0e0] rounded-xl text-base transition duration-300 focus:outline-none focus:border-[#3498db]"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-[#2c3e50] font-semibold">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange}
              required 
              className="py-3 px-3 border border-[#e0e0e0] rounded-xl text-base transition duration-300 focus:outline-none focus:border-[#3498db]"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-[#2c3e50] font-semibold">Phone</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange}
              required 
              className="py-3 px-3 border border-[#e0e0e0] rounded-xl text-base transition duration-300 focus:outline-none focus:border-[#3498db]"
            />
          </div>
          <div className="flex gap-4 mt-4 sm:flex-row flex-col">
            <button 
              type="submit" 
              className="flex-1 py-3 border-none rounded-xl cursor-pointer transition duration-300 hover:scale-[1.02] font-bold bg-[#3498db] text-white hover:bg-[#2980b9]"
            >
              Update Profile
            </button>
            <button 
              type="button" 
              className="flex-1 py-3 border-none rounded-xl cursor-pointer transition duration-300 hover:scale-[1.02] font-bold bg-[#e74c3c] text-white hover:bg-[#c0392b]"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
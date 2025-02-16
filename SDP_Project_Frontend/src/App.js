// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './auth/signup/SignUp';
// import Login from './auth/login/Login';
// import ForgotPassword from "./auth/forgot-password/ForgotPassword";
// import Landing from './landing/Landing';
// import FeatureDetails from './landing/FeatureDetails';
// import ContactUs from './landing/ContactUs'; 
// import UserProfile from './components/UserProfile';
// import OwnerHome from './owner/home';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/features/:featureId" element={<FeatureDetails />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/my_profile" element={<UserProfile />} />
//           <Route path="/Manage_Property" element={<OwnerHome />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;








import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './auth/signup/SignUp';
import Login from './auth/login/Login';
import ForgotPassword from "./auth/forgot-password/ForgotPassword";
import Landing from './landing/Landing';
import FeatureDetails from './landing/FeatureDetails';
import ContactUs from './landing/ContactUs'; 
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/features/:featureId" element={<FeatureDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/my_profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
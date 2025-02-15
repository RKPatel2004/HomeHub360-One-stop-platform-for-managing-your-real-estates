// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ContactUs.css';

// const ContactUs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="contact-page">
//       <div className="back-button" onClick={() => navigate('/')}>
//         <span className="arrow-icon">←</span>
//         <span>Back to Home</span>
//       </div>

//       {/* <nav className="feature-nav">
//         <div className="nav-content">
//           <Link to="/" className="back-link">
//             <span className="back-arrow">←</span>
//             <span>Back to Home</span>
//           </Link>
//           <h1 className="nav-title">HomeHub360</h1>
//         </div>
//       </nav> */}

//       <div className="contact-container">
//         <div className="contact-header">
//           <h1>Contact Us 📞</h1>
//           <p className="description">
//             Need to get in touch? We&apos;re here to help! Reach out to us through any of the following channels
//             and we&apos;ll get back to you as soon as possible. 🤝
//           </p>
//         </div>

//         <div className="contact-content">
//           <div className="contact-info">
//             <div className="info-section">
//               <h2>📧 Email</h2>
//               <ul>
//                 <li>
//                   <span className="label">Primary:</span>
//                   <a href="mailto:rudra0405@gmail.com">rudra0405@gmail.com</a>
//                 </li>
//                 <li>
//                   <span className="label">Secondary:</span>
//                   <a href="mailto:tirth546patel@gmail.com">tirth546patel@gmail.com</a>
//                 </li>
//               </ul>
//             </div>

//             <div className="info-section">
//               <h2>📱 Phone</h2>
//               <ul>
//                 <li>
//                   <span className="label">Main:</span>
//                   <a href="tel:+918200943776">+91 8200943776</a>
//                 </li>
//                 <li>
//                   <span className="label">Alternative:</span>
//                   <a href="tel:+919316995797">+91 9316995797</a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="map-section">
//             <h2>📍 Our Location</h2>
//             <div className="map-container">
//               <iframe
//                 src="https://www.google.com/maps/embed/v1/place?key=AIzaSyATL2mQ30lMA5QyNavrpEEyb1ubMtSeMBQ&q=Dharmsinh+Desai+University,+Nadiad"
//                 width="100%"
//                 height="450"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Google Maps"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;














import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="feature-details-page">
      <nav className="feature-nav">
        <div className="nav-content">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span>
            <span>Back to Home</span>
          </Link>
          <h1 className="nav-title">HomeHub360</h1>
        </div>
      </nav>
      
      <div className="feature-hero">
        <div className="feature-hero-content">
          <div className="feature-icon">📞</div>
          <h1>Contact Us</h1>
          <p className="feature-description">
            Need to get in touch? We&apos;re here to help! Reach out to us through any of the following channels
            and we&apos;ll get back to you as soon as possible. 🤝
          </p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h2>📧 Email</h2>
              <ul>
                <li>
                  <span className="label">Primary:</span>
                  <a href="mailto:rudra0405@gmail.com">rudra0405@gmail.com</a>
                </li>
                <li>
                  <span className="label">Secondary:</span>
                  <a href="mailto:tirth546patel@gmail.com">tirth546patel@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h2>📱 Phone</h2>
              <ul>
                <li>
                  <span className="label">Main:</span>
                  <a href="tel:+918200943776">+91 8200943776</a>
                </li>
                <li>
                  <span className="label">Alternative:</span>
                  <a href="tel:+919316995797">+91 9316995797</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="map-section">
            <h2>📍 Our Location</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyATL2mQ30lMA5QyNavrpEEyb1ubMtSeMBQ&q=Dharmsinh+Desai+University,+Nadiad"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
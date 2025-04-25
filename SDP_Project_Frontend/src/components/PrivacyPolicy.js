import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      <div className="header">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        <h1>Privacy Policy</h1>
      </div>
      
      <div className="content">
        <section>
          <h2>1. Information We Collect</h2>
          <p>At HomeHub360, we collect personal information that you provide directly to us when you create an account, list a property, make a booking, or contact our support team. This may include your name, email address, phone number, physical address, payment information, and property details.</p>
        </section>
        
        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you notifications about your account or properties, and respond to your inquiries. We may also use your information to prevent fraud and enhance the security of our platform.</p>
        </section>
        
        <section>
          <h2>3. Information Sharing</h2>
          <p>We may share your information with property owners, property managers, or tenants as necessary to facilitate bookings and transactions. We do not sell your personal information to third parties for marketing purposes.</p>
        </section>
        
        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </section>
        
        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You may also request a copy of the personal information we hold about you. To exercise these rights, please contact us at privacy@homehub360.com.</p>
        </section>
        
        <section>
          <h2>6. Cookie Policy</h2>
          <p>We use cookies and similar technologies to enhance your experience on our platform. You can manage your cookie preferences through your browser settings.</p>
        </section>
        
        <section>
          <h2>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        </section>
        
        <div className="footer-note">
          <p>Last Updated: April 25, 2025</p>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@homehub360.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
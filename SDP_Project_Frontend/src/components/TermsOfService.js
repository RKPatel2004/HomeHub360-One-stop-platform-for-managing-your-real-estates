import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <div className="header">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        <h1>Terms of Service</h1>
      </div>
      
      <div className="content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using HomeHub360's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>
        
        <section>
          <h2>2. User Accounts</h2>
          <p>To use certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.</p>
        </section>
        
        <section>
          <h2>3. Property Listings</h2>
          <p>Property owners and managers are responsible for providing accurate information about their properties. HomeHub360 reserves the right to remove any listing that violates our policies or contains misleading information.</p>
          <p>All images and descriptions must accurately represent the property being listed. Misrepresentation may result in account suspension or termination.</p>
        </section>
        
        <section>
          <h2>4. Booking and Payments</h2>
          <p>All bookings are subject to availability and confirmation. Payment processing is handled securely through our platform. Cancellation policies vary by property and are specified in each listing.</p>
          <p>HomeHub360 charges service fees for facilitating transactions between users. These fees are non-refundable except as required by law.</p>
        </section>
        
        <section>
          <h2>5. Prohibited Activities</h2>
          <p>Users are prohibited from:</p>
          <ul>
            <li>Violating any applicable laws or regulations</li>
            <li>Infringing on the rights of others</li>
            <li>Posting false or misleading information</li>
            <li>Attempting to gain unauthorized access to our systems</li>
            <li>Using our platform for any illegal or unauthorized purpose</li>
          </ul>
        </section>
        
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>HomeHub360 is not responsible for the conduct of users on our platform. We do not guarantee the quality, safety, or legality of properties listed on our platform. Users use our services at their own risk.</p>
        </section>
        
        <section>
          <h2>7. Intellectual Property</h2>
          <p>All content and materials available on HomeHub360, including but not limited to logos, designs, text, graphics, and software, are the property of HomeHub360 or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
        </section>
        
        <section>
          <h2>8. Termination</h2>
          <p>We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>
        </section>
        
        <section>
          <h2>9. Changes to Terms</h2>
          <p>We may modify these Terms of Service at any time. We will notify users of material changes by posting a notice on our website or sending an email. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.</p>
        </section>
        
        <div className="footer-note">
          <p>Last Updated: April 25, 2025</p>
          <p>If you have any questions about these Terms of Service, please contact us at legal@homehub360.com</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
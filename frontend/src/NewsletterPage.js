import React, { useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import './NewsletterPage.css'; // Ensure the CSS file is correctly imported

const NewsletterPage = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    try {
      // Update URL to match your backend's running address
      const response = await axios.post('http://localhost:3001/NewsletterPage', { email });
      setMessage(response.data.message);  // Success message from the server
      form.current.reset(); // Reset the form
      setEmail(''); // Clear the email input
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to subscribe. Please try again.');
    }
  };
  

  return (
    <div className="container">
      {/* Subscription Header */}
      <div className="header">
        <h1>SIGN UP FOR OUR DAILY INSIDER</h1>
        <form ref={form} className="subscription-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            name="user_email" // Use this name for EmailJS
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Explore Section */}
      <div className="main-content">
        <div className="column">
          <h2>Explore</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#questions">Questions</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#tutorials">Tutorials</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="column">
          <h2>Support</h2>
          <ul>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div className="column">
          <h2>Stay connected</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="social-icon fb"><FaFacebookF /></div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="social-icon twitter"><FaTwitter /></div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="social-icon insta"><FaInstagram /></div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>DEV@Deakin</p>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms</a></li>
          <li><a href="#code">Code of Conduct</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default NewsletterPage;

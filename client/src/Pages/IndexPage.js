import React from 'react';
import { Link } from 'react-router-dom';
import './IndexPage.css';  // Add your custom styles here

const IndexPage = () => {
  return (
    <div className="index-container">
      <h1>Welcome to the Blog App</h1>
      <p>Get started by signing up or logging in.</p>
      <div className="button-container">
        <Link to="/login">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;

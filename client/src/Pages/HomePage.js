import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css';
import './Subscription';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]); // State for all blogs
  const [userBlogs, setUserBlogs] = useState([]); // State for user's blogs
  const [user, setUser] = useState(null); // State for user data
  const navigate = useNavigate(); // For navigating after sign-out
  // Fetch all blogs and user blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:4000/blogs");
      const data = await response.json();
      setBlogs(data.blogs);
    };

    fetchBlogs();

    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
    console.log("Logged In User:", loggedInUser); // Add debugging to check user data

    if (loggedInUser) {
      setUser(loggedInUser); // Set the logged-in user
      // Fetch user's blogs
      const fetchUserBlogs = async () => {
        const response = await fetch(`http://localhost:4000/blogs/myblogs/${loggedInUser.username}`);
        const data = await response.json();
        setUserBlogs(data.blogs);
      };

      fetchUserBlogs();
    }
  }, []); // Only run once when the component mounts

  // Handle the sign-out action
  const handleSignOut = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Set user state to null
    navigate("/"); // Navigate to the landing page
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">BlogPlatform</Link>
          <div className="navbar-links">
            <Link to="/create" className="navbar-link">Create Blog</Link>

            {user ? (
              <>
                <span className="user-info">Hello, {user.username}</span>
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/subscription" className="navbar-link">Subscription</Link>
                <Link to="/profile" className="navbar-link">Profile</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container">
        <h1 className="page-title">Welcome to the Blog Platform</h1>

        <section className="all-blogs">
          <h2>All Blogs</h2>
          <div className="blog-list">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.content.substring(0, 100)}...</p>
                <Link to={`/blogs/${blog._id}`} className="read-more-link">Read More</Link>
              </div>
            ))}
          </div>
        </section>

        {user && (
          <section className="my-blogs">
            <h2>My Blogs</h2>
            <div className="blog-list">
              {userBlogs.length > 0 ? (
                userBlogs.map((blog) => (
                  <div key={blog._id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <p>{blog.content.substring(0, 100)}...</p>
                    <Link to={`/blogs/${blog._id}`} className="read-more-link">Read More</Link>
                  </div>
                ))
              ) : (
                <p>No blogs yet. Start writing!</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;

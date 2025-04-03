import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './myBlogPage.css' // Import Link from react-router-dom

const MyBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/blogs');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        console.log("Fetched Blogs:", data);  // Log the data for debugging

        // Assuming the data structure contains a `blogs` array
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="blog-container">
      <h2>My Blogs</h2>
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.content ? blog.content.substring(0, 100) : 'No content available'}...</p>
              {/* Use Link from react-router-dom instead of <a> */}
              <Link to={`/blog/${blog._id}`} className="read-more-link">Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogPage;

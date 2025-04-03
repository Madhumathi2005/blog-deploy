import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createblog.css';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all required fields are filled
    if (!title || !content || !author || !category) {
      alert('Please fill all the required fields');
      return;
    }

    const blogData = {
      title,
      content,
      author,
      category,
      externalLink,
    };

    try {
      const response = await fetch('http://localhost:4000/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (response.status === 200) {
        // Blog created successfully, navigate to MyBlogPage
        alert(data.message);
        navigate('/blogs'); // Use the correct route to view blogs
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('There was an error creating your blog. Please try again.');
    }
  };

  return (
    <div>
      <div className="create-blog-form">
        <h2>Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>External Link (optional)</label>
            <input
              type="text"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>
          <button type="submit">Post Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
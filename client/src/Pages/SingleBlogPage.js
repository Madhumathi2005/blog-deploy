import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SingleBlogPage.css';

const SingleBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [externalLink, setExternalLink] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/blogs/${id}`);
                const fetchedBlog = response.data.blog;
                setBlog(fetchedBlog);
                setTitle(fetchedBlog.title);
                setContent(fetchedBlog.content);
                setAuthor(fetchedBlog.author);
                setCategory(fetchedBlog.category);
                setExternalLink(fetchedBlog.externalLink || '');
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/blogs/update/${id}`, {
                title,
                content,
                author,
                category,
                externalLink,
            });
            alert('Blog updated successfully');
            setBlog(response.data.blog);
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Error updating blog');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:4000/blogs/delete/${id}`);
                alert('Blog deleted successfully');
                navigate('/blogs');
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Error deleting blog');
            }
        }
    };

    return (
        <div className="single-blog-page-modern">
            {blog ? (
                <div className="blog-container-modern">
                    <div className="blog-header-modern">
                        <h1 className="blog-title-modern">{blog.title}</h1>
                        <div className="blog-meta-modern">
                            <span className="author-modern">By {blog.author}</span>
                            <span className="category-modern">{blog.category}</span>
                            <span className="date-modern">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="blog-body-modern">
                        <p>{blog.content}</p>
                    </div>

                    <div className="form-section-modern">
                        <h2>Update Blog</h2>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Update Title"
                            className="input-field-modern"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Update Content"
                            className="input-field-modern"
                        ></textarea>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Update Author"
                            className="input-field-modern"
                        />
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Update Category"
                            className="input-field-modern"
                        />
                        <input
                            type="text"
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                            placeholder="External Link (Optional)"
                            className="input-field-modern"
                        />
                        <div className="btn-container-modern">
                            <button className="btn-modern update-btn-modern" onClick={handleUpdate}>Update Blog</button>
                            <button className="btn-modern delete-btn-modern" onClick={handleDelete}>Delete Blog</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="loading-modern">Loading blog...</p>
            )}
        </div>
    );
};

export default SingleBlogPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  
const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams(); 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:4000/blogs/${id}`);
        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>Category:</strong> {blog.category}</p>
      <p>{blog.content}</p>
      {blog.externalLink && (
        <p><strong>External Link:</strong> <a href={blog.externalLink} target="_blank" rel="noopener noreferrer">{blog.externalLink}</a></p>
      )}
    </div>
  );
};

export default BlogDetailPage;

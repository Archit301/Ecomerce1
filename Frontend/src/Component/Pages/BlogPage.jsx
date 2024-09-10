import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
  const { id } = useParams(); // Retrieve the blog ID from the URL
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const res = await fetch(`/backend/blog/getblogbyid/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogById();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {blog ? (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={blog.image || 'https://via.placeholder.com/800x400'} // Placeholder image
            alt={blog.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>By {blog.author}</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
              {/* Render full blog content */}
              {blog.description}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">Blog not found.</div>
      )}
    </div>
    
  )
}

export default BlogPage

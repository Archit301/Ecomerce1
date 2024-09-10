import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "The Future of E-commerce: Trends to Watch in 2025",
    summary: "Explore the latest trends shaping the future of e-commerce, including AI-driven personalization, augmented reality shopping experiences, and more.",
    imageUrl: "https://via.placeholder.com/600x400",
    author: "Jane Doe",
    date: "August 26, 2024",
  },
  {
    id: 2,
    title: "How to Boost Your Online Store’s SEO in 2024",
    summary: "Learn effective SEO strategies to increase your online store’s visibility and attract more customers in 2024.",
    imageUrl: "https://via.placeholder.com/600x400",
    author: "John Smith",
    date: "August 20, 2024",
  },
  {
    id: 3,
    title: "Top 10 Tips for Effective Email Marketing",
    summary: "Discover the best practices for creating email marketing campaigns that drive sales and engage customers.",
    imageUrl: "https://via.placeholder.com/600x400",
    author: "Alice Johnson",
    date: "August 15, 2024",
  },
];


const Blog = () => {
  const [blogs,setblog]=useState([])
  useEffect(()=>{
    const fetchblog=async()=>{
    const res=await fetch('/backend/blog/getlatest');
     const data=await res.json();
     setblog(data)
    }
    fetchblog();
  },[])
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Blog Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest news and insights from our team.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.summary}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {blog.author}</span>
                <span>{new Date(blog.date).toLocaleDateString('en-CA')}</span>
              </div>
              <Link to={`/blog/${blog._id}`} className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Blog

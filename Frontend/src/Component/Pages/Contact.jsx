import React from 'react'
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Header Section */}
      <section className="bg-gray-800 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg mb-8">
          We're here to help! Reach out to us with any questions or feedback.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto">
          <form className="bg-white shadow-lg rounded-lg px-8 py-8">
            {/* Name Field */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                placeholder="Write your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-yellow-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

     
    </div>
  )
}

export default Contact

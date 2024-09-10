import React from 'react'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">About Me</h1>
          <p className="text-lg mb-8">Get to know me, my journey, and my aspirations.</p>
        </div>
      </section>

      {/* My Journey */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Journey</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hello! I am [Your Name], a college student pursuing [Your Major] at [Your College]. My journey began with a passion for [Your Passion] and has led me to explore various fields within [Your Field of Study]. I have been involved in [mention any relevant projects, clubs, or activities], and these experiences have shaped my academic and professional goals.
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-100 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Achievements</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Over the course of my academic career, I have accomplished several milestones, including [mention any awards, recognitions, or significant projects]. These achievements have motivated me to continue striving for excellence and exploring new opportunities.
          </p>
        </div>
      </section>

      {/* Future Aspirations */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Future Aspirations</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Looking ahead, I am excited to pursue a career in [Your Career Interest] and contribute to [specific goals or industries]. I am particularly interested in [mention any specific areas of interest or projects you want to work on]. I am eager to continue learning and growing both academically and professionally.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-800 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-6">Feel free to reach out to me for collaborations, inquiries, or just to connect!</p>
        <Link to="/contact" className="bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">Contact Me</Link>
      </section>

    </div>
  )
}

export default About

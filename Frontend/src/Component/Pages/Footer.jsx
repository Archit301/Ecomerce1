import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto flex flex-wrap justify-between">
    
      <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-2">MyShop</h1>
        <p className="text-gray-400">Providing the best online shopping experience with real-time updates and support.</p>
      </div>
     
      <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-gray-400">Home</a></li>
          <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
          <li><a href="/services" className="hover:text-gray-400">Services</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </div>
    
      <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
        <ul className="space-y-2">
          <li className="flex items-center justify-center md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h5zm-2 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"/></svg>123 Street, City, Country</li>
          <li className="flex items-center justify-center md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 4.5c-3.866 0-7 3.134-7 7 0 1.49.5 2.87 1.33 4.02l-1.5 3.46a1 1 0 0 0 1.2 1.3l3.43-1.26a7 7 0 0 0 5.54 0l3.43 1.26a1 1 0 0 0 1.2-1.3l-1.5-3.46A6.978 6.978 0 0 0 19 11.5c0-3.866-3.134-7-7-7zm0-2c5.18 0 9.5 4.32 9.5 9.5 0 2.264-.735 4.378-1.96 6.09L22 20.07a3 3 0 0 1-3.6 3.8l-3.56-1.29a9.007 9.007 0 0 1-6.8 0l-3.56 1.29A3 3 0 0 1 2 20.07l2.46-2.48C.735 14.378 0 12.264 0 10a9.5 9.5 0 0 1 9.5-9.5z"/></svg>+123 456 7890</li>
          <li className="flex items-center justify-center md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 3v18m-5-5h10m-10-10h10"/></svg>info@example.com</li>
        </ul>
      </div>

      <div className="w-full md:w-1/4 text-center md:text-left">
        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M24 2.557c-.887.394-1.83.662-2.828.785 1.018-.607 1.796-1.564 2.165-2.718-.952.564-2.005.974-3.127 1.195-.896-.956-2.174-1.558-3.591-1.558-2.717 0-4.926 2.209-4.926 4.926 0 .387.043.765.127 1.129-4.094-.205-7.72-2.166-10.16-5.144-.424.728-.666 1.573-.666 2.477 0 1.71.87 3.214 2.19 4.097-.807-.026-1.565-.248-2.228-.616v.061c0 2.384 1.692 4.368 3.934 4.827-.412.111-.847.171-1.29.171-.315 0-.624-.031-.929-.088.626 1.953 2.445 3.377 4.604 3.417-1.684 1.318-3.804 2.105-6.102 2.105-.396 0-.788-.023-1.176-.067 2.179 1.398 4.765 2.215 7.548 2.215 9.058 0 14.016-7.514 14.016-14.016 0-.213-.006-.425-.016-.637.964-.696 1.8-1.565 2.464-2.549z"/></svg></a>
          <a href="#" className="text-gray-400 hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 22.662c5.865 0 10.662-4.797 10.662-10.662S17.865 1.338 12 1.338 1.338 6.135 1.338 12 6.135 22.662 12 22.662zm-1.11-16.195h2.22v3.969h-2.22v-3.969zm1.11 4.505c-1.173 0-2.134.961-2.134 2.134s.961 2.134 2.134 2.134c1.173 0 2.134-.961 2.134-2.134s-.961-2.134-2.134-2.134z"/></svg></a>
          <a href="#" className="text-gray-400 hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.662c-5.865 0-10.662-4.797-10.662-10.662S6.135 1.338 12 1.338 22.662 6.135 22.662 12 17.865 22.662 12 22.662zm-3.744-7.59h1.633v-4.227h-1.633v4.227zm-.814-5.442c-.564 0-1.031.461-1.031 1.031 0 .564.461 1.031 1.031 1.031.564 0 1.031-.461 1.031-1.031 0-.564-.461-1.031-1.031-1.031zm10.062 5.442h-1.633v-2.506c0-1.533-.325-2.599-1.133-2.599-.525 0-.835.335-.972.658-.051.122-.062.292-.062.462v2.985h-1.633c.021-.437.048-.935.048-1.438v-2.548c0-3.445 1.795-5.441 4.305-5.441 1.969 0 2.932 1.096 2.932 2.817v3.44h1.656v2.948h-1.656v4.227h1.656z"/></svg></a>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 text-gray-400 py-4 text-center">
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer

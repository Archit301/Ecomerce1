import React from 'react'

const Logout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
    <h1 className="text-2xl font-semibold mb-4">You Have Been Logged Out</h1>
    <p className="text-gray-600 mb-6">You have successfully logged out of your account. Thank you for visiting!</p>
    
    <div className="space-y-4">
      <a href="/" className="block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        Return to Homepage
      </a>
      <a href="/login" className="block bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">
        Log Back In
      </a>
    </div>
  </div>
</div>
  )
}

export default Logout

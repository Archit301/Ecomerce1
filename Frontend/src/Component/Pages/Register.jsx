import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { siginInStart, siginInSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
});
const navigate=useNavigate();
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const dispatch=useDispatch()
const handleChange = (e) => {
  setFormData({ ...formData,[e.target.id]: e.target.value})
}

const handleSubmit = async(e) => {
  e.preventDefault();
  try {
  // Handle form submission logic here
   dispatch(siginInStart());
  const res = await fetch('/backend/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success===false){
     dispatch(signinFailure(data.message));
  setLoading(false);
  setError(data.message);
  return;
    }
    setLoading(false);
    setError(null);
     dispatch(siginInSuccess(data));
    if(formData.role==="admin"){
         navigate('/request');
      }
      if(formData.role==='user'){
      navigate('/');
   }
    console.log(data);
  } catch (error) {
      dispatch(signinFailure(error.message));
    setLoading(false);
    setError(error.message);
  }
}
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-md rounded-lg">
        {/* Website Name */}
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-600">My Shop</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Create a new account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
           type="text"
           id="username"
           name="username"
           value={formData.username}
           onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="example@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="" disabled>Select your role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="text-sm text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>} 
    </div>
  );
};

export default Register;

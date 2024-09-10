import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { siginInStart, siginInSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
});
const navigate=useNavigate()
const handleChange = (e) => {
  setFormData({ ...formData,[e.target.id]: e.target.value})
}

const {currentUser,error}=useSelector((state)=>state.user)
const dispatch = useDispatch();
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
            
        
    dispatch(siginInStart());
    const res = await fetch('/backend/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
     if(data.success===false){
  dispatch(signinFailure(data.message));
      }
      dispatch(siginInSuccess(data));
      console.log(data);
      console.log(currentUser)
 if(currentUser.role==="admin"){
    navigate('/superadminhomepage')
}
else if(currentUser.role==="user"){
    navigate('/')
}
    } catch (error) {
        if(signinFailure(error.message)!=="Cannot read properties of null (reading 'role')")
             return;
         dispatch(signinFailure(error.message));  
    }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        {/* Website Name */}
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-600">My Shop</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Please log in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Field */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {/* Password Field */}
            <div className="mt-2">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                 type="password"
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          {/* Register Link */}
          <div className="text-sm text-center mt-4">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

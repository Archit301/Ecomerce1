import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch} from "react-icons/fa"

const Header = () => {
  const {currentUser}= useSelector((state)=>state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQUery=urlParams.toString()
    navigate(`/search?${searchQUery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const [countcart,setcount]=useState(0)
  useEffect(()=>{
    const count=async()=>{
     const res=await fetch(`/backend/cart/count/${currentUser._id}`)
     const data=await res.json()
     if(data)
     setcount(data.count)
    else
    setcount(0)

    }
    count()
  },[currentUser])
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6">
        {/* Website Name */}
        <Link to="/" className="text-3xl font-bold tracking-tight hover:text-yellow-400">
          MyShop
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg font-semibold hover:text-yellow-400 transition">Home</Link>
          <Link to="/shop" className="text-lg font-semibold hover:text-yellow-400 transition">Shop</Link>
          <Link to="/blog" className="text-lg font-semibold hover:text-yellow-400 transition">Blog</Link>
          <Link to="/wishlist" className="text-lg font-semibold hover:text-yellow-400 transition">Wishlist</Link>
          {/* <Link to="/about" className="text-lg font-semibold hover:text-yellow-400 transition">About Us</Link>
          <Link to="/contact" className="text-lg font-semibold hover:text-yellow-400 transition">Contact</Link> */}
          {/* <Link to="/faq" className="text-lg font-semibold hover:text-yellow-400 transition">FAQ</Link> */}
       
        </nav>

        {/* Search Bar */}
        <form className="relative flex-grow max-w-md mx-4" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 pl-12 rounded-lg border border-gray-300 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-1/2 transform -translate-y-1/2 left-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300"
        >
          <FaSearch className="text-lg" />
        </button>
      </form>

        {/* User Account and Cart */}
        <div className="flex items-center space-x-6">
          <Link to="/account" className="hover:text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.403-1.403A6.978 6.978 0 0018 13a6.978 6.978 0 00-2.597 2.597L15 17zM8.197 6.084A3.5 3.5 0 119 3a3.5 3.5 0 01-.803 6.084zM12 14a3.5 3.5 0 00-3.5 3.5h7A3.5 3.5 0 0012 14z" />
            </svg>
          </Link>
          <Link to="/cart" className="relative hover:text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l1.68 8.618a2 2 0 001.956 1.582L18 13m0 0l-1.68-8.618a2 2 0 00-1.956-1.582L6 3m0 0l-1.68 8.618A2 2 0 004 13h13" />
            </svg>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">{countcart}</span>
          </Link>
          {/* More Options */}
          <div className="relative group ml-3">
            <button className="text-gray-400 hover:text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>  
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">Order History</Link>
              <Link to="/support" className="block px-4 py-2 hover:bg-gray-100">Support</Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>    
          </div>
         
        </div>
      </div>
    </header>
  )
}

export default Header

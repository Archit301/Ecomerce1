import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Dummy data for latest products and discount offers
// const latestProducts = [
//   { id: 1, name: "Latest Product 1", price: "$24.99", image: "https://via.placeholder.com/300" },
//   { id: 2, name: "Latest Product 2", price: "$34.99", image: "https://via.placeholder.com/300" },
//   { id: 3, name: "Latest Product 3", price: "$44.99", image: "https://via.placeholder.com/300" },
//   { id: 4, name: "Latest Product 4", price: "$54.99", image: "https://via.placeholder.com/300" },
//   { id: 5, name: "Latest Product 4", price: "$54.99", image: "https://via.placeholder.com/300" }
// ];

const discountOffers = [
  { id: 1, description: "20% off on all electronics  haa  ", image: "https://via.placeholder.com/300" },
  { id: 2, description: "Buy one get one free on selected items", image: "https://via.placeholder.com/300" },
  { id: 3, description: "Summer Sale: Up to 50% off", image: "https://via.placeholder.com/300" },
  { id: 4, description: "Clearance: Extra 10% off on clearance items", image: "https://via.placeholder.com/300" }
];
const Home = () => {
  const placeholderImage = 'https://via.placeholder.com/300';
   const [latestProducts,setlatest]=useState([])
   const [discount,setdiscount]=useState([])
   useEffect(()=>{
    const fetchlatest=async()=>{
   const res = await fetch('/backend/product/latest')
   const data=await res.json()
   console.log(data)
   if (Array.isArray(data)) {
    setlatest(data);
  } else {
    console.error('Fetched data is not an array:', data);
    // Optionally, you could set an empty array or handle the error here
    setlatest([]);
  }
}
    fetchlatest()
   },[])
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };
  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://via.placeholder.com/1500x600" alt="Hero" className="w-full h-full object-cover opacity-70" />
        </div>
        <div className="relative container mx-auto text-center px-4 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">Discover Your Next Favorite Product</h1>
          <p className="text-lg lg:text-xl mb-6">Explore our wide range of products and enjoy amazing deals!</p>
          <Link to="/shop" className="bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">Shop Now</Link>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="container mx-auto py-16 px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Products</h2>
        <Slider {...sliderSettings}>
          {latestProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <img src={product.avatar.length > 0 ? product.avatar : placeholderImage}  alt={product.avatar} className="w-full h-48 object-cover mb-4" />    
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <Link to={`/product/${product._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">View Details</Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* Discount Offers Section */}
      <section className="container mx-auto py-16 px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Discount Offers</h2>
        <Slider {...sliderSettings}>
          {discountOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <img src={offer.image} alt="Discount Offer" className="w-full h-48 object-cover mb-4" />
              <div className="p-6 text-center">
                <p className="text-lg font-semibold mb-4">{offer.description}</p>
                <Link to="/offers" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">Explore Offers</Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 Your Store. All rights reserved.</p>
          <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link> | 
          <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
        </div>
      </footer>
</div>
  )
}

export default Home

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';

// const products = [
//     { id: 1, name: "Product 1", price: "$24.99", image: "https://via.placeholder.com/300" },
//     { id: 2, name: "Product 2", price: "$34.99", image: "https://via.placeholder.com/300" },
//     { id: 3, name: "Product 3", price: "$44.99", image: "https://via.placeholder.com/300" },
//     { id: 4, name: "Product 4", price: "$54.99", image: "https://via.placeholder.com/300" },
//     { id: 5, name: "Product 5", price: "$64.99", image: "https://via.placeholder.com/300" },
//     { id: 6, name: "Product 6", price: "$74.99", image: "https://via.placeholder.com/300" },
//     { id: 7, name: "Product 7", price: "$84.99", image: "https://via.placeholder.com/300" },
//     { id: 8, name: "Product 8", price: "$94.99", image: "https://via.placeholder.com/300" }
//   ];
  
  const Shop = () => {
    const [sortBy, setSortBy] = useState('latest');
    const [category, setcategory] = useState('all');
    const [products,setproducts]=useState([])

    useEffect(()=>{
      const fetchAllticket=async()=>{
     const res = await fetch('/backend/product/getallproduct')
     const data=await res.json()
     console.log(data)
     if (Array.isArray(data)) {
      setproducts(data);
    } else {
      console.error('Fetched data is not an array:', data);
      // Optionally, you could set an empty array or handle the error here
      setproducts([]);
    }
  }
  fetchAllticket()
     },[])
  

      useEffect(()=>{
       
       const fetchlatestticket=async()=>{
        if(filter==="latest")
          {
      const res= await fetch('/backend/product/sortlatestproduct', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({category})
     });
     const data = await res.json();
     if (Array.isArray(data)) {
       console.log(data)
       setproducts(data);
       } else {
         console.error('Fetched data is not an array:', data);
     // Optionally, you could set an empty array or handle the error here
        setproducts([]);
       } 
    }
     
  }
   fetchlatestticket()
    },[category])
    // Function to handle sorting

  
       
    

    const handleSortChange = async(event) => {
      setSortBy(event.target.value);
      console.log(event.target.value)
         // Add sorting logic here
    
      if(event.target.value==="latest")
        {
          console.log(event.target.value)
      const res= await fetch('/backend/product/sortlatestproduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({category})
          });
          const data = await res.json();
          console.log(data)
          setproducts(data);
        }
       else{
        console.log(event.target.value)
        var filter=event.target.value
        const res= await fetch('/backend/product/sortcategoryproduct', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({category,filter})
            });
            const data = await res.json();
            console.log(data)
            setproducts(data);
       }
    }
  
    // Function to handle filtering
    const handleFilterChange = async(event) => {
      setcategory(event.target.value);
      var category=event.target.value
      if(event.target.value != 'all'){
        const res= await fetch('/backend/product/sortlatestproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({category})
        });
        const data = await res.json();
        console.log(data)
        setproducts(data);
      
      }
      else{
        const res = await fetch('/backend/product/getallproduct')
        const data=await res.json()
        console.log(data)
         setproducts(data);
      }
      
    };
  
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12">
  
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <label htmlFor="filter" className="block text-lg font-semibold mb-2">Filter by:</label>
            <select
              id="filter"
              value={category}
              onChange={handleFilterChange}
              className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="sort" className="block text-lg font-semibold mb-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
  
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
    products.map((product) => (
      <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">₹{product.price}</p>
          <Link
            to={`/product/${product._id}`} // Use product._id instead of product.id
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    )) 
  ) : (
    <div className="col-span-full text-center p-4">
      <p className="text-gray-500 text-xl">No  {category} product available</p>
    </div>
  )}
</div>
  
      </div>
    )
}

export default Shop

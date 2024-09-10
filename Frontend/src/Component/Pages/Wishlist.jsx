import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch wishlist items from the backend (simulated here)
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch('/backend/wishlist'); // Replace with actual API endpoint
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    // Logic to remove item from wishlist
    setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">${item.price}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/product/${item._id}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">Your wishlist is empty.</div>
      )}
    </div>
  );
};

export default Wishlist;

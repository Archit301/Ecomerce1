import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartUpdated, setCartUpdated] = useState(false);
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await fetch('/backend/cart/getByUserId/66cf89a20ecb482ac675fc88');
          const data=await response.json()
   console.log(data)
   setCartItems(data.map(item => ({
    ...item.product, // Spread product properties
    quantity: item.quantity // Add quantity to product properties
})))
        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCartItems();
    }, [cartUpdated]);
  
    const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    const handleQuantityChange = (id, delta) => {
      console.log(id)
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      );
    };
  
    const handleRemoveItem = async(id) => {
        const user="66cf89a20ecb482ac675fc88"
        const  product=id;
        const res= await fetch('/backend/cart/deleteById', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user,product})
        });
        const data = await res.json();
        if(data==="Succesfully remove the product from cart"){
            alert(data)
            setCartUpdated(!cartUpdated);
        }
    };
  
    if (loading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {/* Cart Items List */}
                        {cartItems.map(item => (
                            <div key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow mb-4">
                                <div className="flex items-center">
                                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l"
                                            onClick={() => handleQuantityChange(item._id, -1)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            className="w-12 text-center border border-gray-300"
                                            readOnly
                                        />
                                        <button
                                            className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r"
                                            onClick={() => handleQuantityChange(item._id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                        onClick={() => handleRemoveItem(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Cart Summary */}
                        <section className="bg-gray-50 p-6 rounded-lg shadow mt-6">
                            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4 border-t border-gray-300 pt-4">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-semibold">₹5.00</span>
                            </div>
                            <div className="flex justify-between mb-4 border-t border-gray-300 pt-4">
                                <span className="text-gray-600">Total:</span>
                                <span className="text-xl font-bold">₹{(calculateSubtotal() + 5).toFixed(2)}</span>
                            </div>
                            <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">Buy Now</button>
                        </section>
                    </div>
                )}
            </div>
        </div>
  )
}
export default Cart

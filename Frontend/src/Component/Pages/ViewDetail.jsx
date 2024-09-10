import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import PaymentButton from './PaymentButton';

// Dummy data for demonstration purposes
 const dummyRelatedProducts = [
   {
    id: 2,
    name: "Related Product 1",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics"
   },
   {
     id: 3,
     name: "Related Product 2",
     price: 39.99,
     image: "https://via.placeholder.com/150",
     category: "Electronics"
   },
   {
     id: 4,
     name: "Related Product 3",
     price: 59.99,
     image: "https://via.placeholder.com/150",
     category: "Electronics"
   },
 ];

const ViewDetail = () => {
  const { productId } = useParams();
  const {currentUser}= useSelector((state)=>state.user)
  const [quantity, setQuantity] = useState(1);
  const user=currentUser._id
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null); // Change to null to avoid unnecessary default value
  const [loading, setLoading] = useState(true); // Add a loading state to handle the loading process
  const [error, setError] = useState(null); // Add an error state to handle errors during fetching
  const [isItemInCart, setIsItemInCart] = useState(false); 
  const [dummyRelatedProducts,setdummy]=useState([])
  const [iswishlist, setwishlist] = useState(false); 
  const placeholderImage = 'https://via.placeholder.com/300';
   useEffect(()=>{
    const userId="66cf89a20ecb482ac675fc88"
    const fetchcart = async () => {
   const res=   await fetch('/backend/cart/getbuuserandproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId,productId})
      });
    const data=await res.json()
    console.log(data)
    if(data==="Item added to cart already"){
      setIsItemInCart(true); // Set state to true if item is in cart
    } else {
      setIsItemInCart(false); // Ensure state is false if item is not in cart
    }
    }
    fetchcart()
   },[productId])
   const handleWishlist =async () => {
    // setIsWishlisted(!isWishlisted)
    const product=productId;
    const res=await fetch('/backend/wishlist/create' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user,product})
    });
    const data = await res.json();
    if(data){
      alert("Item added to Wishlist successfully")
      setwishlist(true)
    }
    setwishlist(false)
  }
   
 


useEffect(() => {
  const fetchrelatedproduct = async () => {
  const res=await fetch(`/backend/product/getProductsInSameCategory/${productId}`)
  const data=await res.json();
  setdummy(data)
  }
  fetchrelatedproduct()
}, [productId])



  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log('Fetching product details...');
        const res = await fetch(`/backend/product/getproductbyid/${productId}`);
        
        // Check if the response is OK
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await res.json();
        console.log('Fetched product data:', data);

        // Assuming data is an array or an object
        setProduct(data); // Change to data[0] if data is an array with one item
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [productId]);// Get product ID from URL params

  // Dummy data for the main product
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>;

const handlecart=async()=>{
  const user="66cf89a20ecb482ac675fc88"
  const  product=productId;
  const res= await fetch('/backend/cart/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user,product})
  });
  const data = await res.json();
  if(data){
    alert("Item added to cart successfully")
    setIsItemInCart(true);
  }
// console.log(data)
}
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row items-center">
      {/* Product Image */}
       <div className="md:w-1/2 mb-4 md:mb-0">
        <img src={product.avatar>0? product.avatar  : placeholderImage}    alt={product.name || 'Product'}  className="w-full h-auto rounded-lg shadow-md" />
      </div> 

      {/* Product Details */}

      <div className="md:w-1/2 md:pl-8">
      <h1 className="text-2xl font-bold mb-4">{capitalizeFirstLetter(product.name)}</h1>
      <p className="text-gray-700 mb-4">{capitalizeFirstLetter(product.description)}</p>
        <p className="text-lg font-semibold mb-2">Price: ₹{product.price}</p>
        <p className="text-lg mb-2">Available Items: <span className="font-semibold">{product.countInStock}</span></p>
        <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>

        <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4 font-semibold">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-md py-2 px-3"
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        {/* Buttons for actions */}
        <div className="flex space-x-4">
          {/* <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200">Buy Now</button> */}
          <PaymentButton  amount={product.price} 
                         ticketId={product._id} 
                         userId={currentUser._id}  />
          {/* <Link to="/cart"> */}
            <button className={`px-4 py-2 font-bold rounded-md transition duration-200 ${isItemInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
             onClick={handlecart}
             disabled={isItemInCart} >
             {isItemInCart ? 'Added to Cart' : 'Add to Cart'}
             </button>
          {/* </Link> */}
          <button
              onClick={handleWishlist}
              disabled={iswishlist}
              className={`px-4 py-2 font-bold rounded-md transition duration-200 ${iswishlist ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
            >
              {iswishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
      </div>
    </div>

    {/* Related Products Section */}
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Related Products</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {dummyRelatedProducts.length > 0 ? (
        dummyRelatedProducts.map((relatedProduct) => (
          <div key={relatedProduct._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
            <p className="text-gray-600 mb-2">Price: ₹{relatedProduct.price.toFixed(2)}</p>
            <Link to={`/product/${relatedProduct._id}`}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mt-2">View Details</button>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center p-4">
          <p className="text-gray-500 text-xl">No Related product available</p>
        </div>
      )}
      </div> 
   
    </div>
  </div>
    );
  };
  
  // Example product data for demonstration
 

export default ViewDetail

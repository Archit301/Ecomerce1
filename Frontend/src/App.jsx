import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Component/Pages/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Component/Pages/Footer'
import Profile from './Component/Pages/Profile'
import Cart from './Component/Pages/Cart'
import Logout from './Component/Pages/Logout'
import Home from './Component/Pages/Home'
import Shop from './Component/Pages/Shop'
import About from './Component/Pages/About'
import Contact from './Component/Pages/Contact'
import Blog from './Component/Pages/Blog'
import Search from './Component/Pages/Search'
import ViewDetail from './Component/Pages/ViewDetail'
import Login from './Component/Pages/Login'
import Register from './Component/Pages/Register'
import BlogPage from './Component/Pages/BlogPage'
import Wishlist from './Component/Pages/Wishlist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
     {/* <div className="flex-1 flex flex-col">  */}
      <Header/>
     <Routes>
     <Route path="/contact" element={ <Contact/>} />
     <Route path="/" element={ <Home/>} />
     <Route path="/register" element={ <Register/>} />
     <Route path="/login" element={ <Login/>} />
     <Route path="/search" element={ <Search/>} />
     <Route path="/blog" element={ <Blog/>} />
     <Route path="/about" element={ <About/>} />
     <Route path="/shop" element={ <Shop/>} />
     <Route path="/account" element={ <Profile/>} />
     <Route path="/cart" element={ <Cart/>} />
     <Route path="/logout" element={ <Logout/>} />
     <Route path="/wishlist" element={ <Wishlist/>} />
     <Route path="/blog/:id" element={<BlogPage />} />
     <Route path="/product/:productId" element={<ViewDetail />} />
    </Routes>
    <Footer/>
    {/* </div> */}
    </Router>
    </>
  )
}

export default App

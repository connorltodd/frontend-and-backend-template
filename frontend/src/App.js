// app.js
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.js";
import { BASE_URL } from "./helpers/api.js";
import axios from 'axios';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Homepage from './components/Homepage/Homepage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Contact from './components/Contact/Contact';
import './App.css';


function App() {
  const [productSearchValue, setProductSearchValue] = React.useState('')
  const [isSearchConfirmed, setSearchConfirmation] = React.useState(false);
  // cart products array
  const [cartProducts, setCartProducts] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    fetchCartProducts()
  }, [user]);

  const fetchCartProducts = () => {
    axios.get(`${BASE_URL}/cart/${user.Cart_id}/products`)
    .then(response => setCartProducts(response.data))
  }

  const handleProductSearchInput = (event) => {
      const currentSearchInputValue = event.target.value
      setProductSearchValue(currentSearchInputValue)
      
      if(currentSearchInputValue === '') {
        setSearchConfirmation(false)
      }
  }

  const modifyProductQuantity = (productExistsInCart) => {
    productExistsInCart.quantity += 1
    axios.put(`${BASE_URL}/cart/${user.Cart_id}/products/${productExistsInCart.cart_product_id}`, {
      "quantity": productExistsInCart.quantity,
      "cart_product_id": productExistsInCart.cart_product_id
    })
    .then(response => {
      fetchCartProducts()
    })
  }

  const addProductToCart = (productToAdd) => {
    const productExistsInCart = cartProducts.find(product => product.product_id === productToAdd.id)
    if (productExistsInCart) {
      modifyProductQuantity(productExistsInCart)
    } else {
      axios.post(`${BASE_URL}/cart/${user.Cart_id}/products/${productToAdd.id}`)
        .then(response => {
          const newCartProducts = [
            // keep everything that is in the array and add a new product at the end
            // the spread copies the existing products
            ...cartProducts,
            response.data[0]
          ]
          // add the product to the cart with the quantity of 1
          setCartProducts(newCartProducts)
        })
    
    }
  }
  

  const deleteProduct = (productToDelete) => {
    axios.delete(`${BASE_URL}/cart/${user.Cart_id}/products/${productToDelete.cart_product_id}`)
    .then(response => {
      // TODO: Remove product from api then sync the frontend
      const newCartProducts = cartProducts.filter(cartProduct => cartProduct.cart_product_id !== productToDelete.cart_product_id);
      setCartProducts(newCartProducts)
    })
  }


  const productSearchSubmit = (productSearchValue) => {
    setSearchConfirmation(true)
  }

  const removeAllProductsFromCart = () => {
    setCartProducts([])
  }

  return (
    <div className="App">
        
            { (window.location.pathname !== '/signup' && window.location.pathname !== '/login') ?
              <Navbar 
                handleProductSearchInput={handleProductSearchInput} 
                productSearchSubmit={productSearchSubmit}
                productSearchValue={productSearchValue}
              />
              :
              null
            }
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route exact path='/products' element={
                  <Homepage 
                    isSearchConfirmed={isSearchConfirmed}
                    productSearchValue={productSearchValue}
                  />
                  } 
                />
                <Route path='/products/:id' element={
                  <ProductDetail 
                    addProductToCart={addProductToCart}
                  />
                  } 
                />
                <Route path='/cart' element={
                  <Cart 
                    cartProducts={cartProducts} 
                    deleteProduct={deleteProduct} 
                    removeAllProductsFromCart={removeAllProductsFromCart} 
                  />
                  } 
                />
                <Route path='/contact' element={<Contact />} /></Route>
                <Route path="*" element={<Navigate to='/products' replace />} />
            </Routes>
    </div>
  );
}

export default App;

// app.js
const ProtectedRoutes = () => {
  const { auth } = React.useContext(AuthContext);
  return (
        auth ? <Outlet /> : <Navigate to='/login' replace />
  );
};

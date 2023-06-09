import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import Profile from './components/Profile/Profile';
import HomeScreen from './pages/shop/HomeScreen';
import CartScreen from './pages/shop/CartScreen';
import ProductScreen from './pages/shop/ProductScreen';
import ShippingAddressScreen from './pages/shop/ShippingAddressScreen';
import PaymentMethodScreen from './pages/shop/PaymentMethodScreen';
import PlaceOrderScreen from './pages/shop/PlaceOrderScreen';
import OrderScreen from './pages/shop/OrderScreen';
import OrderHistoryScreen from './pages/shop/OrderHistoryScreen';
import Searchscreen from './pages/shop/Searchscreen';
import ProtectedRoute from './pages/shop/ProtectedRoute';
import DashboardScreen from './pages/shop/DashboardScreen';
import AdminRoute from './pages/shop/AdminRoute';
import ProductListScreen from './pages/shop/ProductListScreen';
import ProductEditScreen from './pages/shop/ProductEditScreen';
import UserListScreen from './pages/shop/UserListScreen';
import Stage1 from './components/Stage1/Stage1';
import StageForm from './components/Stage1/StageForm';
import Pin from './components/Stage1/Pin';
import Depot from './components/Stage1/Depot';
import OrderListScreen from './pages/shop/OrderListScreen';
import Chat from './components/Stage1/Chat';
import Avancement from './components/Stage1/Avancement';
import MapScreen from './pages/shop/MapScreen';
import Dar from "./pages/dar/Dar";
import Event from "./pages/event/Event";
import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
      <Route path="/" element={<Home />} />
        <Route path="/parascolaire" element={<Dar/>}/>
        <Route path="/events" element={<List/>}/>
        <Route path="/events/:id" element={<Event/>}/>
        

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<Reset />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/Stage1" element={<Stage1 />} />
        <Route path="/StageForm" element={<StageForm />} />
        <Route path="/Pin" element={<Pin />} />
        <Route path="/Depot" element={<Depot />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Avancement" element={<Avancement />} />
        <Route path="/product/:slug" element={<ProductScreen />} />
        <Route path="/cart" element={<ProtectedRoute><CartScreen /></ProtectedRoute>} />
        <Route path="/search" element={<Searchscreen />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/shipping" element={ <ProtectedRoute><ShippingAddressScreen /></ProtectedRoute>} />
        <Route path="/payment" element={<PaymentMethodScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
       

        
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/orderhistory"
          element={
            <ProtectedRoute>
              <OrderHistoryScreen />
            </ProtectedRoute>
          }
        ></Route>
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderListScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderListScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserListScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <ProductEditScreen />
            </AdminRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

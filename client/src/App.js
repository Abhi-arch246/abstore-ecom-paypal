import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'

import Navbar from './components/Navbar';
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import ProductDesc from './pages/ProductDesc';
import CartPage from './pages/CartPage';
import Login from './pages/Login'
import Register from './pages/Register';
import UserPage from './pages/UserPage'
import OrderPage from './pages/OrderPage';
import OrderDesc from './pages/OrderDesc';
import AdminPage from './admin/AdminPage';
import UserList from './admin/UserList';
import ProductList from './admin/ProductList';
import OrderList from './admin/OrderList';
import AddNew from './admin/AddNew';
import Verifyemail from './pages/VerifyMail';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/product/:id' element={<ProductDesc />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/order/:id' element={<OrderPage />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/orderdesc/:id' element={<OrderDesc />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/admin/addnew" element={<AddNew />} />
          <Route path="/verify/:token" element={<Verifyemail />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

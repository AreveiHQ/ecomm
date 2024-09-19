import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";

import UsersPage from "./pages/UsersPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import OrdersPage from "./pages/OrdersPage";
import DashboardPage from "./pages/DashboardPage";
import AddNewProduct from "./pages/AddNewProduct";
import AdminSlideUpload from "./components/SlideUpload";
import SlideInfo from "./pages/SlideInfo";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<DashboardPage/>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add" element={<AddNewProduct/> } />
            <Route path="/orders" element={<OrdersPage/>} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/slide" element={<AdminSlideUpload/>}/>
            <Route path="/slide/info" element={<SlideInfo/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

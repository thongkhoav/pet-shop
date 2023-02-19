import React, { useContext } from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";


// import "react-toastify/dist/ReactToastify.css";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import Pets from "~/pages/Pets/Pets";
import { AuthContext } from "~/context/authContext";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";
import Home from "~/pages/Home/Home";
import User from "~/pages/User/User";

const Layout =() => {
  return <>
    <Navbar/>
    <Outlet/>
    <Footer/>
  </>
}

export default function UserRouter() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<User />} />
          {/* {currentUser?.isAdmin === false && (
            <Route path="/customer" element={<Customer />} />
          )} */}
          <Route path="/pets/species/:id" element={<Pets />} />
          {/* <Route path="/pets/:id" element={<Pets />} /> */}
          {/* <Route path="/specialists/:speId" element={<Specialist />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/blogs/:id" element={<BlogDetail />} /> */}
        </Route>
        {!currentUser && <Route path="/login" element={<Login />} />}
        {!currentUser && <Route path="/register" element={<Register />} />}
        <Route path="*" element={<><h1>404 Page not found</h1>
        <Link to="/">Trang chủ</Link>
        </>} />
      </Routes>
    </>
  );
}

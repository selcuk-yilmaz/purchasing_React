import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Register from "../pages/Register";
// import UpdateBlog from "../pages/UpdateBlog";

import { AuthContext } from "../contexts/AuthContext";
import Newb from "../pages/Newb";

const AppRouter = () => {
  const { auth } = useContext(AuthContext);
  function PrivateRouter() {
    return auth ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="details/newb" element={<Newb />} />
          <Route path="newBlog" element={<NewBlog />} />
          {/* <Route path="details/newBlog" element={<NewBlog />} /> */}
          <Route path="details" element={<PrivateRouter />}>
            <Route path="" element={<Details />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="details/updateBlog" element={<UpdateBlog />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
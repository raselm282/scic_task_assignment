// import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
// import NavigationBar from "../Components/NavigationBar";

const MainLayout = () => {
    return (
        <div className="max-w-full mx-auto  dark:bg-gray-900 dark:text-white">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar></Navbar>
        {/* <NavigationBar/> */}
        <div className="max-w-[90%] mx-auto">
        <div className="min-h-[calc(100vh-292px)] py-7">
          <Outlet />
        </div>
        {/* <Footer></Footer> */}
        </div>
    </div>
    );
};

export default MainLayout;
import React from 'react';


import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="w-100" style={{
        backgroundImage: " linear-gradient(to left, #1E1E1E, #101828 )"
      }}>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  )
}

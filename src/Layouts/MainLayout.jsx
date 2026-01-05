import React from 'react'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import MyNavbar from '../Components/MyNavbar'

export default function MainLayout() {
  return (
    <>
    <MyNavbar/>
      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>
    <Footer/>
    </>
  )
}

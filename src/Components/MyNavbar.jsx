import React, { useContext, useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';




export default function MyNavbar() {

  const { isLogged , setisLogged , setUserData } = useContext(AuthContext);

    const navigate = useNavigate();

    function Logout() {
      localStorage.removeItem('userToken');
      setisLogged(false);
      setUserData(null)
    }

  
  return <>
    <Navbar>
      <NavbarBrand> <Link to={'/'} className="font-bold text-inherit">Social-App</Link> </NavbarBrand>

      <NavbarContent className="flex gap-4" justify="center">

        { isLogged ?
        <>
          <NavbarItem> <Link color="foreground" to={'/profile'}> Profile  </Link> </NavbarItem>
          {/* Call Function Logout */}
          <NavbarItem> <span onClick={Logout} className='cursor-pointer'> Logout </span> </NavbarItem>
        </> 
        :
        <>
        <NavbarItem isActive> <Link aria-current="page" to={'/register'}> Register </Link> </NavbarItem>
        <NavbarItem> <Link color="foreground" to={'/login'}> Login </Link> </NavbarItem>
        </>
      }

        
      </NavbarContent>

      

    </Navbar>
  </>
}

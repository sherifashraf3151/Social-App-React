import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './pages/FeedPage'
import ProfilePage from './pages/ProfilePage'
import SinglePostPage from './pages/SinglePostPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { HeroUIProvider } from '@heroui/react'
import ProtecterRoute from './Components/ProtectedRoute'
import AuthProtectedRoute from './Components/AuthProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {

  const routers = createBrowserRouter([
    { path: '', element: <MainLayout/> , children: [
      { index: true, element: <ProtecterRoute> <FeedPage/> </ProtecterRoute> },
      { path: 'profile', element: <ProtecterRoute> <ProfilePage/> </ProtecterRoute> },
      { path: 'single-post/:id', element: <ProtecterRoute> <SinglePostPage/> </ProtecterRoute> },
    ]},
    { path: '', element: <AuthLayout/> , children: [
      { path: 'register', element: <AuthProtectedRoute> <RegisterPage/> </AuthProtectedRoute> },
      { path: 'login', element: <AuthProtectedRoute> <LoginPage/> </AuthProtectedRoute> },
    ] },
  ])

  return <>
      <HeroUIProvider>
        <RouterProvider router={routers}></RouterProvider>
      </HeroUIProvider>
    </>
  
}

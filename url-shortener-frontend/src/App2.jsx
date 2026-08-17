import React from 'react'
import { BrowserRouter,  Route,  Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { Toaster } from 'react-hot-toast'
import Login from './components/LoginPage'
import LoginPage from './components/LoginPage'
import DashBoardLayout from './components/DashBoard/DashboardLayout'
import { getApps } from './utils/helper'


const App = () => {

  const CurrentApp = getApps();
  
  return (
    <div>
      <BrowserRouter >
      <NavBar></NavBar>
      <Toaster position='top-center'></Toaster>
      <Routes>
        <Route path='/' element={<LandingPage />} />
         <Route path='/about' element={<AboutPage />} />
          <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<DashBoardLayout />} />

      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </div>
  )
}

export default App
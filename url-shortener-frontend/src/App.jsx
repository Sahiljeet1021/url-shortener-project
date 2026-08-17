import React from 'react'
import { BrowserRouter,  Route,  Routes } from 'react-router-dom'
// import LandingPage from './components/LandingPage'
// import AboutPage from './components/AboutPage'
// import NavBar from './components/NavBar'
// import Footer from './components/Footer'
// import RegisterPage from './components/RegisterPage'
// import { Toaster } from 'react-hot-toast'
// import Login from './components/LoginPage'
// import LoginPage from './components/LoginPage'
// import DashBoardLayout from './components/DashBoard/DashboardLayout'
import { getApps } from './utils/helper'


const App = () => {

  const CurrentApp = getApps();
  
  return (
    <div>
      <BrowserRouter >
      
        <CurrentApp />
      </BrowserRouter>
    </div>
  )
}

export default App
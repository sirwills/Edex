import React from 'react'

import Nav from './components/NavBar/Nav'
// import HomeScreen from './components/Screens/HomeScreen'
import { Outlet } from 'react-router-dom'



const App = () => {
  return (
    <>
   <Nav/>
   <Outlet/>
   </>
   

  )
}

export default App
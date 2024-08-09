import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './styles/App.css'
import Home from './pages/home/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="*" element={ <h1>NOT FOUND</h1> }/>
    </Routes>
  )
}

export default App

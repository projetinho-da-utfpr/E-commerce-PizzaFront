import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Paginainicial from './paginas/paginainicial/paginainicial';
import { UserProvider } from './context/usercontext';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Paginainicial />} />
      </Routes>
    </UserProvider>
  )
}

export default App
import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Paginainicial from './paginas/paginainicial/paginainicial';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Paginainicial />} />
    </Routes>
  )
}

export default App
import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Paginainicial from './paginas/paginainicial/paginainicial';
import Produto from './paginas/produto/produto';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Paginainicial />} />
      <Route path="/pizza/:pizzaId" element = {<Produto />} />
    </Routes>
  )
}

export default App
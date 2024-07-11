import React from 'react'
import './produto.css'
import Usuario from '../../componentes/contadeusuario'
import Carrinho from '../../componentes/carrinho'
import { useState, useContext } from 'react'
import { PizzaContext } from '../../context/pizzascontext'


const produto = () => {

  const { pizzas } = useContext(PizzaContext);


  const [showUsuario, setShowUsuario] = useState(false);

  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => {
    setShowCart(false);
  };



  return (
    <>
    <header className="header">
      <section className="flex">
        <a href="#home" className="logo">
          BELLO PIZZO
        </a>
        <nav className="navbar">
          <a href="/">Menu</a>
        </nav>
        <div className="icons">
          <div id="menu-btn" className="fas fa-bars"></div>
          <div
            id="user-btn"
            className="fas fa-user"
            onClick={() => setShowUsuario(!showUsuario)}
          ></div>
          <div id="order-btn" className="fas fa-box"></div>
          <div
            id="cart-btn"
            className="fas fa-shopping-cart"
            onClick={() => setShowCart(!showCart)}
          >
            <span>(9999)</span>
          </div>
          {showCart && <Carrinho handleCloseCart={handleCloseCart} />}
        </div>
      </section>
      {showUsuario && (
        <Usuario handleCloseModal={() => setShowUsuario(false)} />
      )}
    </header>
    
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="pizza">
          <img src={pizza.imagem} alt={pizza.nome} />
          <h3>{pizza.nome}</h3>
          <p>{pizza.descricao}</p>
          <p>R$ {pizza.preco}</p>
          <button>Adicionar ao carrinho</button>
        </div>
      ), [])}
    </div>
      
      
  </>
    )
}
    
export default produto;

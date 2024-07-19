import React from 'react'
import './produto.css'
import Usuario from '../../componentes/contadeusuario'
import Carrinho from '../../componentes/carrinho'
import { useState, useContext } from 'react'
import { PizzaContext } from '../../context/pizzascontext'


const produto = ({ produto }) => {

  const produtoId = produto.menuItem.id;


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


      <div className="container">
        <div className="pizza">
          <div className="pizza-img">
            <img src={produtoId.image} alt={produtoId.name} />
          </div>
          <div className="pizza-details">
            <h1>{produtoId.name}</h1>
            <p>{produtoId.description}</p>
            <h2>R$ {produtoId.price}</h2>
            <button>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>


    </>
  )
}

export default produto;

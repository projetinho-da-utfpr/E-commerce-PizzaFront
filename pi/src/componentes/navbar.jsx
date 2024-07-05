import React from "react";
import Usuario from "./contadeusuario";
import Carrinho from "./carrinho";
import { useState } from "react";

const Navbar = () => {
  const [showUsuario, setShowUsuario] = useState(false);

  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => {
    setShowCart(false);
  };

  
  return (
    <header className="header">
      <section className="flex">
        <a href="#home" className="logo">
          BELLO PIZZO
        </a>
        <nav className="navbar">
          <a href="#home">Menu</a>
          <a href="#about">Sobre nós</a>
          <a href="#menu">Cardápio</a>
          <a href="#order">Pedidos</a>
          <a href="#faq">Perguntas e respostas</a>
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
  );
};

export default Navbar;

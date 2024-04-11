
import Pedido from "./pedido";
import Sobrenos from "./sobrenos";
import Cardapio from "./cardapio";
import Menu from "./menu";
import Perguntas from "./perguntas";
import Usuario from "./contadeusuario";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contatos from "./contato";

export default function App() {
  // *** JUNTAR COM O BANCO DE DADOS *** //
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/pizzas')
      .then((response) => {
        setPizzas(response.data);
        setMenuItems(response.data.map((pizza, index) => ({
          id: index + 1,
          image: pizza.imagem,
          name: pizza.nome,
          price: pizza.preco,
        })));
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, []);

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/usuario')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching usuarios:', error);
      });
  }, []);

  // SLIDES DAS PIZZAS
  const slides = pizzas.map((pizza) => ({
    imagem : pizza.imagem,
    nome: pizza.nome,
  }));
  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };


  
  // CARDÁPIO DAS PIZZAS
  // const [menuItems, setMenuItems] = useState([
  //   {
  //     id: 1,
  //     image: "images/pizza-1.jpg",
  //     name: "Pizza de lá ele receba",
  //     price: 2,
  //   },
  //   {
  //     id: 2,
  //     image: "images/pizza-2.jpg",
  //     name: "Pizza de devolva",
  //     price: 4,
  //   },
  // ]);


  const [showUsuario, setShowUsuario] = useState(false);

  return (
    <>
       ### CABEÇALHO ###
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
            <div id="cart-btn" className="fas fa-shopping-cart">
              <span>(9999)</span>
            </div>
          </div>
        </section>
      </header>
      {showUsuario && (
        <Usuario handleCloseModal={() => setShowUsuario(false)} />
      )}
      {/* {showPedido && (
        **componente do pedido**
      )} */}
      
      ### HOME COM AS PIZZAS ###
      <Menu
        slides={slides}
        currentSlide={currentSlide}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      ### SOBRE NÓS ###
      <Sobrenos />
      ### CARDÁPIO ###
      <Cardapio menuItems={menuItems} />
      ### PEDIDO ###
      <Pedido />
      ### PERGUNTAS E RESPOSTAS ###
      <Perguntas />
      ### CONTATO ###
      <Contatos />
    </>
  );
}

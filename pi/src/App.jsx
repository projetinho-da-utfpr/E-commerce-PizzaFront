import React, { useContext, useState } from "react";
import Pedido from "./componentes/pedido";
import Sobrenos from "./componentes/sobrenos";
import Cardapio from "./componentes/cardapio";
import Menu from "./componentes/menu";
import Perguntas from "./componentes/perguntas";
import Contatos from "./componentes/contato";
import Navbar from "./componentes/navbar";
import { PizzaContext } from "./context/pizzascontext"; 

export default function App() {
  const { pizzas } = useContext(PizzaContext); 

  // *** JUNTAR COM O BANCO DE DADOS *** //
  const [currentSlide, setCurrentSlide] = useState(0);

  // SLIDES DAS PIZZAS
  const slides = pizzas.map((pizza) => ({
    imagem: pizza.imagem,
    nome: pizza.nome,
  }));

  const produtos = pizzas.map((pizza) => ({
    name: pizza.nome,
    price: pizza.preco,
    image: pizza.imagem,
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


  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      {/* ### CABEÇALHO ### */}
      <Navbar
        handleCartClick={handleCartClick}
      />
      {/* ### HOME COM AS PIZZAS ### */}
      <Menu
        slides={slides}
        currentSlide={currentSlide}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      {/* ### SOBRE NÓS ### */}
      <Sobrenos />
      {/* ### CARDÁPIO ### */}
      <Cardapio menuItems={produtos} />
      {/* ### PEDIDO ### */}
      <Pedido />
      {/* ### PERGUNTAS E RESPOSTAS ### */}
      <Perguntas />
      {/* ### CONTATO ### */}
      <Contatos />
    </>
  );
}

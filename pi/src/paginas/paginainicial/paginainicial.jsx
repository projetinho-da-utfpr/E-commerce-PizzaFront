import React, { useContext, useState } from "react";
import Pedido from "../../componentes/pedido";
import Sobrenos from "../../componentes/sobrenos";
import Cardapio from "../../componentes/cardapio";
import Menu from "../../componentes/menu";
import Perguntas from "../../componentes/perguntas";
import Contatos from "../../componentes/contato";
import Navbar from "../../componentes/navbar";
import { PizzaContext } from "../../context/pizzascontext";

export default function Paginainicial() {
  const { pizzas } = useContext(PizzaContext); // DADOS DOS PRODUTOS
  const [carrinho, setCarrinho] = useState([]); // CARRINHO
  const [currentSlide, setCurrentSlide] = useState(0);

  // SLIDES DAS PIZZAS
  const slides = pizzas.map((pizza) => ({
    imagem: pizza.image,
    nome: pizza.name,
  }));

  // PRODUTOS PARA O CARDÁPIO
  const produtos = pizzas.map((pizza) => ({
    name: pizza.name,
    price: pizza.price,
    image: pizza.image,
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

  // ESTADO DO CARRINHO
  const handleCartClick = () => {
    setShowCart(true);
  };
  // ADICIONAR PRODUTO AO CARRINHO
  const adicionarCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };
  // REMOVER PRODUTO DO CARRINHO, NAO TA FUNCIONANDO AINDA
  const removerCarrinho = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  return (
    <>
      {/* ### CABEÇALHO ### */}
      <Navbar handleCartClick={handleCartClick} carrinho={carrinho} />
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
      <Cardapio menuItems={produtos} adicionarNoCarrinho={adicionarCarrinho}/>
      {/* ### PEDIDO ### */}
      <Pedido />
      {/* ### PERGUNTAS E RESPOSTAS ### */}
      <Perguntas />
      {/* ### CONTATO ### */}
      <Contatos />
    </>
  );
}

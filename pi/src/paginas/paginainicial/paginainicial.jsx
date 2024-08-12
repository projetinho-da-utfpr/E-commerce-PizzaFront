import React, { useContext, useState, useEffect } from "react";
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
  const [size, setSize] = useState("Pequena");

  const [precototal, setPrecototal] = useState(0);

  useEffect(() => {
    console.log("Pizzas:", pizzas);
  }, [pizzas]);

  if (!Array.isArray(pizzas) || pizzas.length === 0) {
    return <div>Carregando...</div>;
  }

  const baseURL = "http://localhost:8080/foto/mostrar/";

  // SLIDES DAS PIZZAS
  const slides = pizzas.map((pizza) => ({
    imagem: `${baseURL}${pizza.imagem}`,
    nome: pizza.nome,
  }));

  // PRODUTOS PARA O CARDÁPIO
  const produtos = pizzas.map((pizza) => ({
    id: pizza.id,
    name: pizza.nome,
    price: pizza.preco,
    image: `${baseURL}${pizza.imagem}`,
    descricao: pizza.ingredientes,
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
    setPrecototal(precototal + Number(produto.price * produto.quantity));
  };
  // REMOVER PRODUTO DO CARRINHO
  const removerCarrinho = (id) => {
    setCarrinho((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
  }

    // Altera o tamanho da pizza
    const handleSizeClick = (size) => {
      setSize(size);
    };

  return (
    <>
      {/* ### CABEÇALHO ### */}
      <Navbar handleCartClick={handleCartClick} carrinho={carrinho} precoTotal={precototal} removercarrinho={removerCarrinho} size={size} />
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
      <Cardapio menuItems={produtos} adicionarNoCarrinho={adicionarCarrinho} handleSizeClick={handleSizeClick}  />
      {/* ### PEDIDO ### */}
      <Pedido carrinho={carrinho}/>
      {/* ### PERGUNTAS E RESPOSTAS ### */}
      <Perguntas />
      {/* ### CONTATO ### */}
      <Contatos />
    </>
  );
}

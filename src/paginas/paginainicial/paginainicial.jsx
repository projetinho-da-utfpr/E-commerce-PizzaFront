import React, { useContext, useState, useEffect } from "react";
import Pedido from "../../componentes/pedido";
import Sobrenos from "../../componentes/sobrenos";
import Cardapio from "../../componentes/cardapio";
import Menu from "../../componentes/menu";
import Perguntas from "../../componentes/perguntas";
import Contatos from "../../componentes/contato";
import Navbar from "../../componentes/navbar";
import { PizzaContext } from "../../context/pizzascontext";
import { v4 as uuidv4 } from 'uuid';
import MonteSuaPizza from "../../componentes/montesuapizza";
import { useUser } from '../../context/usercontext';

export default function Paginainicial() {
  const { pizzas } = useContext(PizzaContext); // DADOS DOS PRODUTOS
  const [carrinho, setCarrinho] = useState([]); // CARRINHO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [size, setSize] = useState("Pequena");
  const [precoCarrinho, setPrecoCarrinho] = useState(0);
  const { userData } = useUser();

  const [precototal, setPrecototal] = useState(0);


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
    especificacoes: pizza.especificacoes.map((especificacao) => ({
      medida: especificacao.medida,
      price: especificacao.preco
    })),
    image: `${baseURL}${pizza.imagem}`,
    descricao: pizza.ingredientes,
  }));
  
  console.log(produtos);
  

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
    const produtoComDetalhes = {
      ...produto,
      preco: precoCarrinho,
      medida: size,
      uniqueId: uuidv4()
    };
    setCarrinho([...carrinho, produtoComDetalhes]);
    setPrecototal(precototal + Number(precoCarrinho * produto.quantity));
  };
  const handleQuantityChange = (uniqueId, newQuantity) => {
    setCarrinho(prevCarrinho => 
      prevCarrinho.map(item => {
        if (item.uniqueId === uniqueId) {
          const oldTotal = item.preco * item.quantity;
          const newTotal = item.preco * newQuantity;
          setPrecototal(prevTotal => prevTotal - oldTotal + newTotal);
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };
  // REMOVER PRODUTO DO CARRINHO
  function removerCarrinho(uniqueId) {
    const item = carrinho.find((item) => item.uniqueId === uniqueId);
    
    if (item) {
      const precoCarrinho = Number(item.preco);
      const quantidade = item.quantity;
      const valorRemover = precoCarrinho * quantidade;
  
      // Atualizar o preço total, garantindo que não fique negativo
      setPrecototal((prevPrecototal) => Math.max(0, prevPrecototal - valorRemover));
  
      // Remover o item do carrinho
      const novoCarrinho = carrinho.filter((item) => item.uniqueId !== uniqueId);
      setCarrinho(novoCarrinho);
    }
  }

    // Altera o tamanho da pizza
    const handleSizeClick = (size) => {
      setSize(size);
    };

    const [showMontarPizza, setShowMontarPizza] = useState(false);

    const handleMontarPizza = () => {
      setShowMontarPizza(!showMontarPizza);
    }

    return (
      <>
        {/* ### CABEÇALHO ### */}
        <Navbar handleCartClick={handleCartClick} carrinho={carrinho} precoTotal={precototal} removercarrinho={removerCarrinho} handleQuantityChange={handleQuantityChange} size={size} precoCarrinho={precoCarrinho} />
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
        <Cardapio menuItems={produtos} adicionarNoCarrinho={adicionarCarrinho} handleSizeClick={handleSizeClick} precoCarrinho={setPrecoCarrinho} />
        {/* ### MONTE SUA PIZZA ### */}
        <div className="monte-a-sua-pizza">
          <h1>Customize a sua pizza do jeito que você gosta!</h1>
          <button onClick={handleMontarPizza}>Monte sua pizza!</button>
        </div>
        {showMontarPizza && <MonteSuaPizza modal={handleMontarPizza} handleSizeClick={handleSizeClick} adicionarNoCarrinho={adicionarCarrinho} precoCarrinho={setPrecoCarrinho} />}
        {/* ### PEDIDO ### */}
        <Pedido carrinho={carrinho} userData={userData} />
  
        {/* ### PERGUNTAS E RESPOSTAS ### */}
        <Perguntas />
        {/* ### CONTATO ### */}
        <Contatos />
      </>
    );
  }
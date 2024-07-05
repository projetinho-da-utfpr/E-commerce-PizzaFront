import Pedido from "./componentes/pedido";
import Sobrenos from "./componentes/sobrenos";
import Cardapio from "./componentes/cardapio";
import Menu from "./componentes/menu";
import Perguntas from "./componentes/perguntas";
import Usuario from "./componentes/contadeusuario";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Contatos from "./componentes/contato";
import Carrinho from "./componentes/carrinho";
import Navbar from "./componentes/navbar";

export default function App() {
  // *** JUNTAR COM O BANCO DE DADOS *** //
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/pizzas")
      .then((response) => {
        setPizzas(response.data);
        setMenuItems(
          response.data.map((pizza, index) => ({
            id: index + 1,
            image: pizza.imagem,
            name: pizza.nome,
            price: pizza.preco,
            descricao: pizza.descricao,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/usuario")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usuarios:", error);
      });
  }, []);

  // SLIDES DAS PIZZAS
  const slides = pizzas.map((pizza) => ({
    imagem: pizza.imagem,
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

  const [showUsuario, setShowUsuario] = useState(false);

  const [showCart, setShowCart] = useState(false);

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
      <Cardapio menuItems={menuItems} />
      {/* ### PEDIDO ### */}
      <Pedido />
      {/* ### PERGUNTAS E RESPOSTAS ### */}
      <Perguntas />
      {/* ### CONTATO ### */}
      <Contatos />
    </>
  );
}

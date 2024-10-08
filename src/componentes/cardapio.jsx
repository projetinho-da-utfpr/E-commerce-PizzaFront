import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MonteSuaPizza from "./montesuapizza";

function Cardapio({ menuItems, adicionarNoCarrinho, handleSizeClick, precoCarrinho }) {
  // Tamanho da pizza
  const [selectedSize, setSelectedSize] = useState("Pequena");
  // Pizza selecionada
  const [selectedPizza, setSelectedPizza] = useState(null);
  // Quantidade de pizzas
  const [quantity, setQuantity] = useState(1);
  // Aba dos produtos cobertos
  const [showAllItems, setShowAllItems] = useState(false);
  // Input de qtd de itens
  const boxContainerRef = useRef(null);
  const firstRowItems = menuItems.slice(0, 3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pizzaFiltrada, setPizzaFiltrada] = useState("");
  const [preco, setPreco] = useState(0);

  precoCarrinho(preco)
  const [isModalMonte, setMontaPizza] = useState(false);
  const MontaPizza = () => {
    setMontaPizza(!isModalMonte);
  }

  useEffect(() => {
    precoCarrinho(preco);
  }, [preco, precoCarrinho]);

  useEffect(() => {
    if (boxContainerRef.current) {
      boxContainerRef.current.style.maxHeight = showAllItems
        ? `${boxContainerRef.current.scrollHeight}px`
        : `550px`;
    }
  }, [showAllItems]);

  const getPreco = (especificacoes, medida) => {
    if (!especificacoes) {
      console.error("Especificações não definidas");
      return "N/A";
    }
    const especificacao = especificacoes.find(especificacao => especificacao.medida === medida);
    return especificacao ? especificacao.price : "N/A";
  };

  const escolheTamanho = (tamanho) => {
    setSelectedSize(tamanho);
    setPreco(getPreco(selectedPizza.especificacoes, tamanho));
  };

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
    setPreco(getPreco(pizza.especificacoes, "Pequena"));
  };

  const closeModal = () => {
    setSelectedPizza(null);
    setIsModalOpen(false);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = (pizza) => {
    adicionarNoCarrinho({ ...pizza, quantity: Math.max(1, quantity), size: selectedSize, preco });
    setQuantity(1);
    closeModal();
  };

  const buscaPizza = menuItems.filter(pizza =>
    pizza.name.toLowerCase().includes(pizzaFiltrada.toLowerCase())).slice(0, 10);

  const toggleMenu = () => {
    setShowAllItems(!showAllItems);
  };

  const handleCloseMenu = () => {
    setShowAllItems(false);
    const menuElement = document.getElementById("menu");
    menuElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="menu" className={`menu ${showAllItems ? "expanded" : ""}`}>
      <h1 className="heading">Cardápio</h1>

      <div className="barra-pesquisa">
        <input 
          type="text" 
          placeholder="Digite o nome da pizza" 
          onChange={(e) => setPizzaFiltrada(e.target.value)} 
        />
        {pizzaFiltrada && (
          <ul>
            {buscaPizza.map((pizza, index) => (
              <li key={index}>
                <img src={pizza.image} alt="" />
                <div className="info">
                  <h1>{pizza.name}</h1>
                  <div className="price"><p>R$ {getPreco(pizza.especificacoes, "Pequena")}</p></div>
                  <button onClick={() => handlePizzaClick(pizza)}>Adicionar ao carrinho</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div ref={boxContainerRef} className="box-container">
        {(showAllItems ? menuItems : firstRowItems).map((menuItem) => (
          <div key={menuItem.id} className="box">
            <div className="price">
              R$ <span>{getPreco(menuItem.especificacoes, "Pequena")}</span>
            </div>
            <img
              src={menuItem.image}
              alt={menuItem.name}
              style={{ objectFit: "cover", height: "350px", width: "130%" }}
            />
            <div className="name">{menuItem.name}</div>
            <div className="vermais">
              <button onClick={() => handlePizzaClick(menuItem)}>
                Adicionar no carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showAllItems ? (
        <button className="expand-button" onClick={toggleMenu}>
          <i className="fa fa-angle-down"></i>
        </button>
      ) : (
        <button className="close-button" onClick={handleCloseMenu}>
          <i className="fa fa-angle-up"></i>
        </button>
      )}

      {isModalOpen && selectedPizza && (
        <div className="overlay">
          <div className="pizza-details">
            <button onClick={closeModal} className="close-button-details">
              &times;
            </button>
            <h1>{selectedPizza.name}</h1>
            <img src={selectedPizza.image} alt={selectedPizza.name} />
            <div className="price">
              <p>Preço: R$<span>{preco}</span></p>
            </div>
            <div className="description">
              <p>{selectedPizza.descricao}</p>
            </div>
            <div className="size-buttons">
              {["Pequena", "Média", "Grande", "Metro"].map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? "active" : ""}`}
                  onClick={() => {handleSizeClick(size); escolheTamanho(size);}}
                >
                  {size}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={handleQuantityChange}
              className="qty"
              name="qty"
            />
            <button onClick={() => handleAddToCart(selectedPizza)}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cardapio;
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const [pizzaFiltrada, setPizzaFiltrada] = useState("");

  const[preco, setPreco] = useState(0);

  precoCarrinho(preco);


  const getPreco = (especificacoes, medida) => {
    if (!especificacoes) {
      console.error("Especificações não definidas");
      return "N/A";
    }
    const especificacao = especificacoes.find(especificacao => especificacao.medida === medida);
    return especificacao ? especificacao.price : "N/A";
  };

  const escolheTamanhoPequena = () => {
    setSelectedSize("Pequena");
    setPreco(getPreco(selectedPizza.especificacoes, "Pequena"));

  }

  const escolheTamanhoMedia = () => {
    setSelectedSize("Média");
    setPreco(getPreco(selectedPizza.especificacoes, "Média"));
  }

  const escolheTamanhoGrande = () => {
    setSelectedSize("Grande");
    setPreco(getPreco(selectedPizza.especificacoes, "Grande"));
  }

  const escolheTamanhoMetro = () => {
    setSelectedSize("Metro");
    setPreco(getPreco(selectedPizza.especificacoes, "Metro"));
  }




  // Seleciona a pizza e abra o modal de detalhes dela
  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
    const pizzaDetailsElement = document.getElementById("pizza-details");
    pizzaDetailsElement.scrollIntoView({ behavior: "smooth" });
  };


  const toggleMenu = () => {
    setShowAllItems(!showAllItems);
  };

  const handleCloseMenu = () => {
    setShowAllItems(false);
    const menuElement = document.getElementById("menu");
    menuElement.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (boxContainerRef.current) {
      const firstRowHeight =
        boxContainerRef.current.getBoundingClientRect().height;
      boxContainerRef.current.style.maxHeight = showAllItems
        ? `${boxContainerRef.current.scrollHeight}px`
        : `550px`;
    }
  }, [showAllItems]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setSelectedPizza(null);
    setIsModalOpen(false);
  };



  // Altera a quantidade de itens
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = (pizza) => {
    adicionarNoCarrinho({ ...pizza, quantity: Math.max(1, quantity) });
    setQuantity(1);
  };

  const buscaPizza = menuItems.filter(pizza =>
    pizza.name.toLowerCase().includes(pizzaFiltrada.toLowerCase())).slice(0, 10);


  return (
    <section id="menu" className={`menu ${showAllItems ? "expanded" : ""}`}>
      {isModalOpen && selectedPizza && (
        <div className="pizza-details">
          <button onClick={closeModal} className="close-button-details">
            Fechar
          </button>

          <h1>{selectedPizza.name}</h1>
          <div className="imagem">
            <img src={selectedPizza.image} alt={selectedPizza.name} />
          </div>

          <div className="price">
            <p>Preço: R$<span>{preco}</span></p>
          </div>

          <div className="description">
            <p>{selectedPizza.descricao}</p>
          </div>

          <div className="size-buttons">
            <button
              className={`size-button ${selectedSize === "Pequena" ? "active" : ""}`}
              onClick={() => {handleSizeClick("Pequena"); escolheTamanhoPequena()}}
            >
              Pequena
            </button>
            <button
              className={`size-button ${selectedSize === "Média" ? "active" : ""}`}
              onClick={() => {handleSizeClick("Média"); escolheTamanhoMedia();}}
            >
              Média
            </button>
            <button
              className={`size-button ${selectedSize === "Grande" ? "active" : ""}`}
              onClick={() => {handleSizeClick("Grande"); escolheTamanhoGrande();}}
            >
              Grande
            </button>
            <button
              className={`size-button ${selectedSize === "Metro" ? "active" : ""}`}
              onClick={() => {handleSizeClick("Metro"); escolheTamanhoMetro();}}
            >
              Metro
            </button>
          </div>


          <button onClick={() => { handleAddToCart(selectedPizza); closeModal(); escolheTamanhoPequena(); }}>
            Adicionar ao Carrinho
          </button>

          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={handleQuantityChange}
            className="qty"
            name="qty"
          />
        </div>
      )}
      <h1 className="heading">Cardápio</h1>

      <div className="barra-pesquisa">
        <input type="text" placeholder="Digite o nome da pizza" onChange={(e) => setPizzaFiltrada(e.target.value)} />
        {pizzaFiltrada && (<ul>
          {buscaPizza.map((pizza, index) => (
            <li key={index}>
              <img src={pizza.image} alt="" />
              <div className="info">
                <h1>{pizza.name}</h1>
                <div className="price"><p>R$ {pizza.price}</p> </div>
                <button onClick={() => {handlePizzaClick(pizza)}}>Adicionar ao carrinho</button>
              </div>
            </li>
          ))}
        </ul>)}
      </div>



      <div ref={boxContainerRef} className="box-container">
        {firstRowItems.map((menuItem) => (

          <div key={menuItem.id} className="box">
            <div className="price">
              R$<span>{getPreco(menuItem.especificacoes, selectedSize)}</span>
            </div>
            <img
              src={menuItem.image}
              alt={menuItem.name}
              style={{ objectFit: "cover", height: "350px", width: "130%" }}
            />
            <div className="name">{menuItem.name}</div>
            <div className="vermais">
              <Link to={`pizza/${menuItem.id}`}>
                <button>Veja mais</button>
              </Link>
              <button onClick={() => handlePizzaClick(menuItem)}>
                Adicionar no carrinho
              </button>
            </div>

          </div>
        ))}
        {showAllItems &&
          menuItems.slice(3).map((menuItem) => (
            <div
              key={menuItem.id}
              className="box"
              onClick={() => handlePizzaClick(menuItem)}
            >
              <div className="Descricao">{menuItem.description}</div>
              <div className="price">
                R$<span>{menuItem.price}</span>
              </div>
              <img
                src={menuItem.image}
                alt={menuItem.name}
                style={{ objectFit: "cover", height: "350px", width: "130%" }}
              />
              <div className="name">{menuItem.name}</div>
              <div className="vermais">
                <a href="/pizza">
                  <button>Veja mais</button>
                </a>
                <button onClick={() => handlePizzaClick(menuItem)}>
                  Adicionar no carrinho
                </button>
              </div>
              <div className="qty-btn-container"></div>
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
    </section>
  );
}

export default Cardapio;

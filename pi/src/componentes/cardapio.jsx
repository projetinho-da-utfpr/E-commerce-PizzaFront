import React, { useState, useRef, useEffect} from "react";

function Cardapio({ menuItems, adicionarNoCarrinho }) {

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


  // Altera o tamanho da pizza
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  // Altera a quantidade de itens
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };



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

          <div className="descricao">
            <p>{selectedPizza.description}</p>
          </div>

          <div className="price">
            R$<span>{selectedPizza.price}</span>
          </div>

          <div className="size-buttons">
            <button
              className={`size-button ${selectedSize === "Pequena" ? "active" : ""}`}
              onClick={() => handleSizeClick("Pequena")}
            >
              Pequena
            </button>
            <button
              className={`size-button ${selectedSize === "Média" ? "active" : ""}`}
              onClick={() => handleSizeClick("Média")}
            >
              Média
            </button>
            <button
              className={`size-button ${selectedSize === "Grande" ? "active" : ""}`}
              onClick={() => handleSizeClick("Grande")}
            >
              Grande
            </button>
            <button
              className={`size-button ${selectedSize === "Metro" ? "active" : ""}`}
              onClick={() => handleSizeClick("Metro")}
            >
              Metro
            </button>
          </div>

          <button onClick={() => adicionarNoCarrinho(selectedPizza)}>
            Adicionar ao Carrinho
          </button>

          <input
            type="number"
            min="0"
            max="100"
            value={quantity}
            onChange={handleQuantityChange}
            className="qty"
            name="qty"
          />
        </div>
      )}
      <h1 className="heading">Cardápio</h1>

      <div ref={boxContainerRef} className="box-container">
        {firstRowItems.map((menuItem) => (
          <div key={menuItem.id} className="box">
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
              <form action="" method="post">
                <div className="qty-btn-container"></div>
              </form>
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

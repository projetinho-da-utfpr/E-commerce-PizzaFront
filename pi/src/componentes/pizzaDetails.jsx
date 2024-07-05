import React, { useState } from "react";

function PizzaDetails({ pizza }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState("Pequena");
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState("");

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddPizzaToCart = () => {
    setConfirmation(
      `Você adicionou ${quantity} pizza(s) ${pizza.name} de tamanho ${selectedSize} ao carrinho.`
    );
  };

  return (
    <section className={`pizza-details ${isOpen ? "" : "closed"}`}>
      <button onClick={() => setIsOpen(false)} className="close-button-details">
        Fechar
      </button>
      <h1>{pizza.name}</h1>
      <img src={pizza.image} alt={pizza.name} />
      <p>{pizza.description}</p>
      <div className="price">
        R$<span>{pizza.price}</span>
      </div>

      <div className="size-buttons">
        <button
          className={`size-button ${
            selectedSize === "Pequena" ? "active" : ""
          }`}
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

      <div>
        <h1>{pizza.descricao}</h1>
      </div>

      <button onClick={handleAddPizzaToCart}>Adicionar ao Carrinho</button>

      <input
        type="number"
        min="0"
        max="100"
        value={quantity}
        onChange={handleQuantityChange}
        className="qty"
        name="qty"
      />

      {confirmation && <p>{confirmation}</p>}
    </section>
  );
}

export default PizzaDetails;

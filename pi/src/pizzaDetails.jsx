import React, { useState } from 'react';

function PizzaDetails({ pizza }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Pequena'); // Estado para o tamanho selecionado

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleToggleDetails = () => {
    setIsOpen(!isOpen);
  }

  return (
    <section className={`pizza-details ${isOpen ? '' : 'closed'}`}>
      <h1>{pizza.name}</h1>
      <img src={pizza.image} alt={pizza.name} />
      <p>{pizza.description}</p>
      <div className="price">
        R$<span>{pizza.price}</span>
      </div>

      <div className="size-buttons">
        <button
          className={`size-button ${selectedSize === 'Pequena' ? 'active' : ''}`}
          onClick={() => handleSizeClick('Pequena')}
        >
          Pequena
        </button>
        <button
          className={`size-button ${selectedSize === 'Média' ? 'active' : ''}`}
          onClick={() => handleSizeClick('Média')}
        >
          Média
        </button>
        <button
          className={`size-button ${selectedSize === 'Grande' ? 'active' : ''}`}
          onClick={() => handleSizeClick('Grande')}
        >
          Grande
        </button>
        <button
          className={`size-button ${selectedSize === 'Metro' ? 'active' : ''}`}
          onClick={() => handleSizeClick('Metro')}
        >
          Metro
        </button>
      </div>

      <div>
        <h1>{pizza.descricao}</h1>
      </div>

      <button>Adicionar ao Carrinho</button>


    </section>
  );
}

export default PizzaDetails;

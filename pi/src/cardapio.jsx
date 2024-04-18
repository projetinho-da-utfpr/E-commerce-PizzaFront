import React, { useState, useRef, useEffect } from "react";

function Cardapio({ menuItems }) {
  const [showAllItems, setShowAllItems] = useState(false);
  const boxContainerRef = useRef(null);
  const [cart, setCart] = useState([]); // Estado para armazenar itens do carrinho

  const firstRowItems = menuItems.slice(0, 3);

  const toggleMenu = () => {
    setShowAllItems(!showAllItems);
  };

  const handleCloseMenu = () => {
    setShowAllItems(false);
    const menuElement = document.getElementById("menu");
    menuElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (menuItem, quantity) => {
    // Função para adicionar item ao carrinho
    if (quantity > 0) {
      setCart([...cart, { ...menuItem, quantity }]);
    }
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

  return (
    <section id="menu" className={`menu ${showAllItems ? "expanded" : ""}`}>
      <h1 className="heading">Cardápio</h1>

      <div ref={boxContainerRef} className="box-container">
        {firstRowItems.map((menuItem) => (
          <MenuItem menuItem={menuItem} handleAddToCart={handleAddToCart} />
        ))}
        {showAllItems &&
          menuItems.slice(3).map((menuItem) => (
            <MenuItem menuItem={menuItem} handleAddToCart={handleAddToCart} />
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

      {/* Exibir o carrinho */}
      <div>
        <h2>Carrinho de Compras</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - Quantidade: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MenuItem({ menuItem, handleAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div key={menuItem.id} className="box">
      <div className="price">
        R$<span>{menuItem.price}</span>
      </div>
      <img src={menuItem.image} alt={menuItem.name} />
      <div className="name">{menuItem.name}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToCart(menuItem, quantity);
        }}
      >
        <div className="qty-btn-container">
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="qty"
            name="qty"
          />
          <input
            type="submit"
            value="Adicionar ao carrinho"
            name="add_to_cart"
            className="btn"
          />
        </div>
      </form>
    </div>
  );
}

export default Cardapio;

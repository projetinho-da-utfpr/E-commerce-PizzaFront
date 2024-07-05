import React, { useState, useRef, useEffect } from "react";
import PizzaDetails from "./pizzaDetails";

function Cardapio({ menuItems, pizzaDetails }) {
  const [showAllItems, setShowAllItems] = useState(false);
  const boxContainerRef = useRef(null);
  const firstRowItems = menuItems.slice(0, 3);

  const [selectedPizza, setSelectedPizza] = useState(null);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
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

  return (
    <section id="menu" className={`menu ${showAllItems ? "expanded" : ""}`}>
      {selectedPizza && <PizzaDetails pizza={selectedPizza} id="pizza-details" />}
      <h1 className="heading">Cardápio</h1>

      <div ref={boxContainerRef} className="box-container">
        {firstRowItems.map((menuItem) => (
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
              <div className="vermais">
                <button>Veja mais</button>
              </div>
            </form>
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

import React, { useState, useRef, useEffect } from 'react';

function Cardapio({ menuItems }) {
  const [showAllItems, setShowAllItems] = useState(false);
  const boxContainerRef = useRef(null);
  const firstRowItems = menuItems.slice(0, 3);

  const toggleMenu = () => {
    setShowAllItems(!showAllItems);
  };

  const handleCloseMenu = () => {
    setShowAllItems(false);
    const menuElement = document.getElementById('menu');
    menuElement.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (boxContainerRef.current) {
      const firstRowHeight = boxContainerRef.current.getBoundingClientRect().height;
      boxContainerRef.current.style.maxHeight = showAllItems ? `${boxContainerRef.current.scrollHeight}px` : `550px`;
    }
  }, [showAllItems]);

  return (
    <section id="menu" className={`menu ${showAllItems ? 'expanded' : ''}`}>
      <h1 className="heading">Cardápio</h1>

      <div ref={boxContainerRef} className="box-container">
        {firstRowItems.map((menuItem) => (
          <div key={menuItem.id} className="box">
            <div className="price">R$<span>{menuItem.price}</span></div>
            <img src={menuItem.image} alt={menuItem.name} />
            <div className="name">{menuItem.name}</div>
            <form action="" method="post">
            <div className="qty-btn-container">   
              <input type="number" min="1" max="100" value="0" className="qty" name="qty" />
              <input type="submit" value="Adicionar ao carrinho" name="add_to_cart" className="btn" />
              </div>
            </form>
          </div>
        ))}
        {showAllItems && (
          menuItems.slice(3).map((menuItem) => (
            <div key={menuItem.id} className="box">
              <div className="price">R$<span>{menuItem.price}</span></div>
              <img src={menuItem.image} alt={menuItem.name} />
              <div className="name">{menuItem.name}</div>
              <form action="" method="post">
              <div className="qty-btn-container"> 
                <input type="number" min="1" max="100" value="0" className="qty" name="qty" />
                <input type="submit" value="Adicionar ao carrinho" name="add_to_cart" className="btn" />
                </div>
              </form>
            </div>
          ))
        )}
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

import React, { useState } from "react";

function Carrinho({ handleCloseCart }) {
  const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="shopping-cart">
      <section>
        <div id="close-cart">
          <span onClick={handleCloseCart}>Fechar</span>
        </div>
        {cartItems.map((item) => (
          <div className="box" key={item.id}>
            <a href="#" className="fas fa-times"></a>
            <img src={`images/pizza-${item.id}.jpg`} alt="" />
            <div className="content">
              <p>
                {item.name}{" "}
                <span>
                  ( ${item.price}/- x {item.quantity})
                </span>
              </p>
              <form action="" method="post">
                <input
                  type="number"
                  className="qty"
                  name="qty"
                  min="1"
                  value={item.quantity}
                  max="100"
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="fas fa-edit"
                  name="update_qty"
                ></button>
              </form>
            </div>
          </div>
        ))}
        <a href="#order" className="btn">
          Peça agora
        </a>
      </section>
    </div>
  );
}

export default Carrinho;

import React from "react";

function Carrinho({ handleCloseCart, cartItems, removerCarrinho }) {



  return (
    <div className="shopping-cart">
      <section>
        <div id="close-cart">
          <span onClick={handleCloseCart}>Fechar</span>
        </div>
        {cartItems.map((item) => (
          <div className="box" key={item.id}>
            <button onClick={() => removerCarrinho(item.id)} className="fas fa-times"></button>
            <img src={item.image} alt="" className="img-carrinho"/>
            <div className="content">
              <p>
                {item.name}{" "}
                <span>
                  ( R$ {item.price} / - x {item.quantity})
                </span>
              </p>
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

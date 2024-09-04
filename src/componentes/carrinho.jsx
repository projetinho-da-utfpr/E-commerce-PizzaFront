import React from 'react';

function Carrinho({ handleCloseCart, cartItems, removerCarrinho, handleQuantityChange, precoTotal }) {
  return (
    <div className="shopping-cart">
      <section>
        <div id="close-cart">
          <span onClick={handleCloseCart}>Fechar</span>
        </div>
        {cartItems.map((item) => (
          <div className="box" key={item.uniqueId}>
            <button
              onClick={() => removerCarrinho(item.uniqueId)}
              className="fas fa-times"
            ></button>
            <img src={item.image} alt="" className="img-carrinho" />
            <div className="content">
              <p>
                {item.name}{" "}
                <span>
                  ( R$ {item.preco} x {item.quantity})
                </span>
              </p>
              <p>Tamanho: {item.medida}</p>
              <div className="qty-carrinho">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.uniqueId, parseInt(e.target.value) || 1)}
                  className="qty-carrinho"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="preco">
          <h4>
            Total: <span>R$ {precoTotal}</span>
          </h4>
        </div>
        <a href="#order" className="btn">
          Peça agora
        </a>
      </section>
    </div>
  );
}

export default Carrinho;
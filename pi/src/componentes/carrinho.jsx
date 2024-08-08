function Carrinho({ handleCloseCart, cartItems, removerCarrinho, handleQuantityChange, precoTotal, size }) {
  return (
    <div className="shopping-cart">
      <section>
        <div id="close-cart">
          <span onClick={handleCloseCart}>Fechar</span>
        </div>
        {cartItems.map((item) => (
          <div className="box" key={item.id}>
            <button onClick={() => {
              console.log(`Removendo item com id: ${item.id}`);
              removerCarrinho(item.id);
            }} className="fas fa-times"></button>
            <img src={item.image} alt="" className="img-carrinho" />
            <div className="content">
              <p>
                {item.name}{" "}
                <span>
                  ( R$ {item.price} x {item.quantity})
                </span>
                <p>
                  Tamanho: {size}{" "}
                  </p>
              </p>
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
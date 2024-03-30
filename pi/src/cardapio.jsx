

function Cardapio({ menuItems }) {
  return (
    <section id="menu" className="menu">
      <h1 className="heading">Cardápio</h1>

      <div className="box-container">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="box">
            <div className="price">R$<span>{menuItem.price}</span></div>
            <img src={menuItem.image} alt={menuItem.name} />
            <div className="name">{menuItem.name}</div>
            <form action="" method="post">
              <input type="number" min="1" max="100" value="1" className="qty" name="qty" />
              <input type="submit" value="Adicionar ao carrinho" name="add_to_cart" className="btn" />
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cardapio;
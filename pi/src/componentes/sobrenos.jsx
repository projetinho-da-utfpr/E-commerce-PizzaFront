export default function SobreNos() {
  return (
    <section className="about" id="about">
      <h1 className="heading">Sobre nós</h1>

      <div className="box-container">
        <div className="box">
          <img src="images/about-1.svg" alt="" />
          <h3>Feito com com amor por profissionais</h3>
          <p>Nossos profissionais são dedicados a sua ótima experiência.</p>
          <a href="#menu" className="btn">
            Nosso cardápio
          </a>
        </div>

        <div className="box">
          <img src="images/about-2.svg" alt="" />
          <h3>45 minutos de entrega</h3>
          <p>Após confirmado o pedido, faremos sua pizza o mais rápido possível, nossas médias de entregas é de 45 minutos.</p>
          <a href="#menu" className="btn">
            Nosso cardápio
          </a>
        </div>

        <div className="box">
          <img src="images/about-3.svg" alt="" />
          <h3>Ótimo para dividir com amigos</h3>
          <p>11 de 10 pessoas recomendam e sempre trazem seus amigos para experimentar nossas pizzas.</p>
          <a href="#menu" className="btn">
            Nosso cardápio
          </a>
        </div>
      </div>
    </section>
  );
}

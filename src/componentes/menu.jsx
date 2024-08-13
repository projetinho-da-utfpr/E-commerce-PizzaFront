function Menu({ slides, currentSlide, handlePrev, handleNext }) {
  return (
    <div className="home-bg">
      <section className="home" id="home">
        <div className="slide-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${currentSlide === index ? "active" : ""}`}
            >
              <div className="image">
                <img src={slide.imagem} alt={slide.nome} />
              </div>
              <div className="content">
                <h3>{slide.nome}</h3>
                <div className="fas fa-angle-left" onClick={handlePrev} />
                <div className="fas fa-angle-right" onClick={handleNext} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;

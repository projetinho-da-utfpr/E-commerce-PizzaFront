import { useState } from 'react';

function Menu({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length > 5 ? 5 : slides.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const limitedSlides = slides.slice(0, 5);

  return (
    <div className="home-bg">
      <section className="home" id="home">
        <div className="slide-container">
          {limitedSlides.map((slide, index) => (
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

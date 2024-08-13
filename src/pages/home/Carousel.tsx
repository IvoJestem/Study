import React from "react";
import Slider from "react-slick";
import "../../../index.css";

interface CarouselItem {
  id: number;
  text: string;
  author: string;
}

const items: CarouselItem[] = [
  {
    id: 1,
    text: "Świetna aplikacja! Używam jej codziennie.",
    author: "Jan Kowalski",
  },
  {
    id: 2,
    text: "Bardzo intuicyjna i łatwa w obsłudze.",
    author: "Anna Nowak",
  },
  {
    id: 3,
    text: "Polecam wszystkim! Idealna do codziennych zadań.",
    author: "Piotr Zieliński",
  },
  {
    id: 4,
    text: "Aplikacja spełniła moje oczekiwania w 100%.",
    author: "Maria Wiśniewska",
  },
  {
    id: 5,
    text: "Super funkcjonalności i przyjazny interfejs.",
    author: "Krzysztof Malinowski",
  },
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <p>{item.text}</p>
            <p className="author">— {item.author}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

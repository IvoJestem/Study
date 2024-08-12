import React, { useState } from "react";
import "./App.css";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`app-container ${isMenuOpen ? "menu-open" : ""}`}>
      <header className="header">
        <button
          className={`menu-toggle-btn ${isMenuOpen ? "close-btn" : "open-btn"}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
        <div className="logo">
          <img src={"/pic.jpg"} alt="Logo" />
        </div>
      </header>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to Our Service</h1>
          <p>
            Discover our offerings. Use the menu to explore various sections.
          </p>
          <button className="cta-btn">Get Started</button>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <p>We offer assistance in recruiting new players to your team.</p>
        </section>

        <Carousel />

        {/* Możesz dodać więcej treści tutaj */}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div className="social-icons">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

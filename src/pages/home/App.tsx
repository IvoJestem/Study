import React, { useState } from "react";
import "../../../index.css";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`app-container2 ${isMenuOpen ? "menu-open" : ""}`}>
      <header className="header">
        <button
          className={`menu-toggle-btn ${isMenuOpen ? "close-btn" : "open-btn"}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? "" : "Open Menu"}
        </button>
        <div className="logo">
          <img src={"/pic.jpg"} alt="Logo" />
        </div>
      </header>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="main-content3">
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
                <a
                  href="../../../public/services.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div className="social-icons">
            <ul>
              <li>
                <a href="#facebook">Facebook</a>
              </li>
              <li>
                <a href="#twitter">Twitter</a>
              </li>
              <li>
                <a href="#instagram">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./App.css"; // Styl główny aplikacji
import SlideOutMenu from "./src/components/SlideOutMenu"; // Import SlideOutMenu

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Stan menu (otwarte/zamknięte)

  // Funkcja do przełączania stanu menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-container">
      {/* Renderowanie przycisków otwierania/zamykania menu w zależności od stanu */}
      {!isMenuOpen && (
        <button className="menu-toggle-btn open-btn" onClick={toggleMenu}>
          Open Menu
        </button>
      )}
      {isMenuOpen && (
        <button className="menu-toggle-btn close-btn" onClick={toggleMenu}>
          Close Menu
        </button>
      )}

      <SlideOutMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      <div className="main-content">
        <h1>Witajcie W Naszej Bajce</h1>
      </div>
    </div>
  );
};

export default App;

// SlideOutMenu.tsx
import React from "react";
import "./SlideOutMenu.css";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`slide-out-menu ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <nav>
        <ul>
          <li>
            <div className="pusto">"Transfer Application"</div>
          </li>
          <li>
            <a href="./src/home">Home</a>
          </li>
          <li>
            <a href="/src/transferlist/">Lista Transferowa</a>
          </li>
          <li>
            <a href="/src/search/">Wyszukiwarka</a>
          </li>
          <li>
            <a href="/src/about/">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SlideOutMenu;

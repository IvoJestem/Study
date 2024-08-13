// SlideOutMenu.tsx
import React from "react";
import "../../../index.css";

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
            <div className="pusto">Transfer Application</div>
          </li>
          <li>
            <a href="/../src/pages/home/">Home</a>
          </li>
          <li>
            <a href="/../src/pages/transferlist/">Lista Transferowa</a>
          </li>
          <li>
            <a href="/../src/pages/search/">Wyszukiwarka</a>
          </li>
        </ul>
        <div className="logout">
          <a href="/../src/pages/login/">Wyloguj</a>
        </div>
      </nav>
    </div>
  );
};

export default SlideOutMenu;

import React, { useState } from "react";

import CardTable from "./PlayerTable";
import { Player, initialPlayer } from "../../components/Database/Database";
import "../../../index.css";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";

const TransferList: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards] = useState<Player[]>(initialPlayer);

  return (
    <div className="app-container">
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className={`main-content ${isMenuOpen ? "menu-open" : ""}`}>
        {!isMenuOpen && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            Open Menu
          </button>
        )}
        <div className="main-content">
          <h1>Lista Transferowa</h1>
          <CardTable cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default TransferList;

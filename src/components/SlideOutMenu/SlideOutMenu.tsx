import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0, // Menu z lewej strony
        width: "250px",
        height: "100%",
        backgroundColor: "background.paper", // Użycie koloru tła z motywu
        boxShadow: 5, // Mocniejszy cień
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s ease", // Płynniejsza animacja otwierania/zamykania
        zIndex: 1300,
        borderRadius: "0 8px 8px 0", // Zaokrąglenie po prawej stronie
        overflowY: "auto", // Przewijanie, jeśli treść jest za duża
      }}
    >
      {/* Button for closing the menu */}
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: "1.5rem",
          color: "text.primary", // Tekst w kolorze podstawowym
          "&:hover": {
            color: "error.main", // Kolor hovera w kolorze błędu
          },
        }}
      >
        &times;
      </Button>

      {/* Menu content */}
      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          marginTop: "64px", // Ustawienie menu poniżej przycisku zamknięcia
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
            color: "primary.main",
            fontWeight: "bold", // Wyróżniony tytuł
            textAlign: "center", // Wycentrowany tytuł
          }}
        >
          Transfer Application
        </Typography>

        {/* Links in the menu */}
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <Box component="li" sx={{ marginBottom: 2 }}>
            <Link
              href="/../src/pages/home/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
                padding: 1,
                display: "block", // Cały obszar klikalny
                borderRadius: 2, // Zaokrąglone rogi
                "&:hover": {
                  backgroundColor: "primary.light", // Tło hovera
                  color: "secondary.main",
                },
              }}
            >
              Home
            </Link>
          </Box>

          <Box component="li" sx={{ marginBottom: 2 }}>
            <Link
              href="/../src/pages/transferlist/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
                padding: 1,
                display: "block", // Cały obszar klikalny
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "secondary.main",
                },
              }}
            >
              Lista Transferowa
            </Link>
          </Box>

          <Box component="li" sx={{ marginBottom: 2 }}>
            <Link
              href="/../src/pages/search/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
                padding: 1,
                display: "block", // Cały obszar klikalny
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "secondary.main",
                },
              }}
            >
              Wyszukiwarka
            </Link>
          </Box>
        </Box>

        {/* Logout link */}
        <Box
          sx={{
            marginTop: "auto",
            paddingY: 2,
            borderTop: "1px solid #e0e0e0", // Linie oddzielająca
            textAlign: "center", // Wycentrowany tekst
          }}
        >
          <Link
            href="/../../.."
            sx={{
              textDecoration: "none",
              color: "error.main",
              fontWeight: "bold",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          >
            Wyloguj
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SlideOutMenu;

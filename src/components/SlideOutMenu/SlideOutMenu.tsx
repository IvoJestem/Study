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
        left: 0,
        width: "250px",
        height: "100%",
        backgroundColor: "background.paper",
        boxShadow: 5,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s ease",
        zIndex: 1300,
        borderRadius: "0 8px 8px 0",
        overflowY: "auto",
      }}
    >
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: "1.5rem",
          color: "text.primary",
          "&:hover": {
            color: "error.main",
          },
        }}
      >
        &times;
      </Button>

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          marginTop: "64px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Transfer Application
        </Typography>

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
                display: "block",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "primary.light",
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
                display: "block",
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
                display: "block",
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

        <Box
          sx={{
            marginTop: "auto",
            paddingY: 2,
            borderTop: "1px solid #e0e0e0",
            textAlign: "center",
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

import React, { useContext } from "react";
import { Box, Button, Typography, Link as MUILink } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { setUser } = userContext;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

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
            <MUILink
              component="button"
              onClick={() => handleNavigation("/home")}
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
            </MUILink>
          </Box>

          <Box component="li" sx={{ marginBottom: 2 }}>
            <MUILink
              component="button"
              onClick={() => handleNavigation("/transferlist")}
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
            </MUILink>
          </Box>

          <Box component="li" sx={{ marginBottom: 2 }}>
            <MUILink
              component="button"
              onClick={() => handleNavigation("/search")}
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
            </MUILink>
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
          <MUILink
            component="button"
            onClick={handleLogout}
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
          </MUILink>
        </Box>
      </Box>
    </Box>
  );
};

export default SlideOutMenu;

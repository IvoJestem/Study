import React, { useContext } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleIcon from "@mui/icons-material/People";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: "Home", path: "/home", icon: <HomeIcon /> },
  { label: "Lista Transferowa", path: "/transferlist", icon: <FormatListBulletedIcon /> },
  { label: "Moi Zawodnicy", path: "/players", icon: <PeopleIcon /> },
  { label: "Symulacja", path: "/search", icon: <SportsEsportsIcon /> },
];

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Pozwala sprawdzić, na jakiej stronie jesteśmy
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user, setUser } = userContext;

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
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 280, 
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#fcfcfc",
        }}
        role="presentation"
      >
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "primary.main", 
            color: "white",
          }}
        >
          <Avatar
            src={user?.avatar || ""}
            sx={{ width: 80, height: 80, marginBottom: 2, border: "3px solid white", boxShadow: 3 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {user?.name || "Użytkownik"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {user?.club || "Brak Klubu"}
          </Typography>
        </Box>

        {/* Główne Menu */}
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
          <List>
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding sx={{ display: "block", marginX: 1, marginBottom: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      minHeight: 48,
                      borderRadius: 2,
                      backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
                      color: isActive ? "primary.main" : "text.primary",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.12)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? "primary.main" : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>


        <Divider />
        <Box sx={{ padding: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "error.dark",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Wyloguj się" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SlideOutMenu;
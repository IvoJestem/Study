import React from "react";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UseUser";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleIcon from "@mui/icons-material/People";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteIcon from "@mui/icons-material/Favorite"; 
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onClose(); 
  };

  const handleLogout = () => {
    setUser(null); 
    navigate("/login");
  };


  const isAdminVisible = user?.role === "Admin" || user?.role === "Prezydent" || user?.role === "Własciciel";

  const MENU_ITEMS = [
    { label: "Home", path: "/home", icon: <HomeIcon />, visible: true },
    { label: "Lista Transferowa", path: "/transferlist", icon: <FormatListBulletedIcon />, visible: true },
    { label: "Moja Kadra", path: "/players", icon: <PeopleIcon />, visible: true },
    { label: "Obserwowani", path: "/shortlist", icon: <FavoriteIcon />, visible: true }, 
    { label: "Symulacja", path: "/search", icon: <SportsEsportsIcon />, visible: true },
    { label: "Panel Admina", path: "/admin", icon: <AdminPanelSettingsIcon />, visible: isAdminVisible },
  ];

  const drawerWidth = 260; 

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isMobile ? isOpen : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0A1929", 
          color: "white",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)", 
          boxShadow: isMobile ? "4px 0 20px rgba(0,0,0,0.5)" : "none",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
        <Box
          onClick={() => handleNavigation("/userprofilepage")} 
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(255, 0, 122, 0.05) 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            cursor: "pointer", 
            transition: "background 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, rgba(0, 180, 216, 0.2) 0%, rgba(255, 0, 122, 0.1) 100%)",
            }
          }}
        >
          <Avatar
            src={user?.avatar || ""}
            sx={{ 
              width: 80, height: 80, marginBottom: 2, 
              border: "3px solid #00B4D8", 
              boxShadow: "0 4px 15px rgba(0, 180, 216, 0.3)" 
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.5 }}>
            {user?.name || "Użytkownik"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#00B4D8", fontWeight: 700, mt: 0.5 }}>
            {user?.role}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 500 }}>
            {user?.club || "Brak Klubu"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, paddingTop: 3 }}>
          <List sx={{ px: 2 }}>
            {MENU_ITEMS.filter(item => item.visible).map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding sx={{ display: "block", marginBottom: 1 }}>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      minHeight: 48,
                      borderRadius: 2,
                      backgroundColor: isActive ? "rgba(0, 180, 216, 0.15)" : "transparent",
                      color: isActive ? "#00B4D8" : "#8A9bb2",
                      borderLeft: isActive ? "4px solid #00B4D8" : "4px solid transparent",
                      "&:hover": {
                        backgroundColor: isActive ? "rgba(0, 180, 216, 0.2)" : "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        "& .MuiListItemIcon-root": { color: "white" }
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? "#00B4D8" : "#8A9bb2",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 800 : 500,
                        fontSize: "0.95rem",
                        letterSpacing: 0.5
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ padding: 3, borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                color: "#FF007A",
                "&:hover": {
                  backgroundColor: "rgba(255, 0, 122, 0.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Wyloguj się" 
                primaryTypographyProps={{ fontWeight: 800, fontSize: "0.95rem" }} 
              />
            </ListItemButton>
          </ListItem>
        </Box>

      </Box>
    </Drawer>
  );
};

export default SlideOutMenu;
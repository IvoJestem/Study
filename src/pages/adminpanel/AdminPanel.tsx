import React, { useEffect, useState } from "react";
import { 
  Container, Typography, Paper, Button, Box, Alert, IconButton, 
  useTheme, useMediaQuery, Tabs, Tab, TextField, InputAdornment, Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import { useUser } from "../../contexts/UseUser";

const AdminPanel: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  useEffect(() => {
    if (user) {
      const isAdmin = user.role === "Admin";
      if (!isAdmin) {
        navigate("/noaccess"); 
      }
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all");
      setAllUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (phone: string) => {
    try {
      await axios.post(`http://localhost:5000/api/users/verify/${phone}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (phone: string, isPending: boolean) => {
    const message = isPending 
      ? "Czy na pewno chcesz odrzucić i usunąć wniosek o rejestrację?"
      : "Czy na pewno chcesz permanentnie usunąć to konto z systemu?";
      
    if (!window.confirm(message)) return;

    try {
      await axios.delete(`http://localhost:5000/api/delete-user/${phone}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = allUsers.filter((u: any) => {
    const isVerified = u.VERIFY === 1;
    if (tabIndex === 0 && isVerified) return false;
    if (tabIndex === 1 && !isVerified) return false; 
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = u.NAME?.toLowerCase().includes(q);
      const matchEmail = u.EMAIL?.toLowerCase().includes(q);
      const matchClub = u.CLUB?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchClub) return false;
    }
    
    return true;
  });

  const pendingCount = allUsers.filter((u) => u.VERIFY === 0).length;
  const verifiedCount = allUsers.filter((u) => u.VERIFY === 1).length;

  if (!user) return null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

      <Box
        component="header"
        sx={{
          display: "flex", alignItems: "center", padding: "16px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 10,
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        {isMobile && (
          <IconButton onClick={() => setIsMenuOpen(true)} sx={{ color: "#0A1929", mr: 2 }}>
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#0A1929", letterSpacing: 1 }}>
          CENTRUM DOWODZENIA
        </Typography>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, pb: 6,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 } }}>
          
          <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 45, color: "#00B4D8" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#0A1929" }}>
                Zarządzanie Użytkownikami
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5 }}>
                Przeglądaj, weryfikuj i usuwaj konta w systemie skautingowym.
              </Typography>
            </Box>
          </Box>

          <Paper elevation={10} sx={{ borderRadius: 4, overflow: "hidden", borderTop: "5px solid #00B4D8", backgroundColor: "#fff" }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
              <Tabs 
                value={tabIndex} 
                onChange={(_e, val) => setTabIndex(val)} 
                sx={{ "& .MuiTabs-indicator": { backgroundColor: "#00B4D8", height: 3 } }}
              >
                <Tab label={`Oczekujący (${pendingCount})`} sx={{ fontWeight: 800, textTransform: "none", fontSize: "1rem" }} />
                <Tab label={`Zweryfikowani (${verifiedCount})`} sx={{ fontWeight: 800, textTransform: "none", fontSize: "1rem" }} />
                <Tab label={`Wszyscy (${allUsers.length})`} sx={{ fontWeight: 800, textTransform: "none", fontSize: "1rem" }} />
              </Tabs>
              
              <TextField
                placeholder="Szukaj użytkownika..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 1, minWidth: 250, "& .MuiOutlinedInput-root": { borderRadius: 50 } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{ p: { xs: 2, md: 4 }, minHeight: 400, backgroundColor: "#f8fafc" }}>
              {filteredUsers.length === 0 ? (
                <Alert severity="info" sx={{ borderRadius: 3, p: 3, fontSize: "1.1rem" }}>
                  Brak użytkowników spełniających podane kryteria.
                </Alert>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {filteredUsers.map((u: any) => {
                    const isVerified = u.VERIFY === 1;
                    const isMe = u.PHONE === user.phone;

                    return (
                      <Paper 
                        key={u.PHONE} 
                        elevation={2} 
                        sx={{ 
                          p: 3, borderRadius: 3, 
                          borderLeft: isVerified ? "6px solid #2e7d32" : "6px solid #f59e0b",
                          display: "flex", flexDirection: { xs: "column", md: "row" }, 
                          justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 3
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0A1929" }}>
                              {u.NAME}
                            </Typography>
                            {isVerified ? (
                              <Chip size="small" icon={<VerifiedUserIcon />} label="Aktywny" color="success" sx={{ fontWeight: "bold" }} />
                            ) : (
                              <Chip size="small" icon={<PendingActionsIcon />} label="Oczekujący" color="warning" sx={{ fontWeight: "bold" }} />
                            )}
                            {isMe && <Chip size="small" label="To Ty" color="primary" variant="outlined" sx={{ fontWeight: "bold" }} />}
                          </Box>
                          
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            <strong>Email:</strong> {u.EMAIL} • <strong>Telefon:</strong> {u.PHONE}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#00B4D8", mt: 0.5 }}>
                            {u.ROLE} @ {u.CLUB || "Brak Klubu"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1.5, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", md: "auto" } }}>

                          {!isVerified && (
                            <>
                              <Button
                                variant="outlined" color="error" startIcon={<CancelIcon />}
                                onClick={() => handleDelete(u.PHONE, true)}
                                sx={{ borderRadius: "50px", textTransform: "none", fontWeight: 800, px: 3, borderWidth: 2 }}
                              >
                                Odrzuć
                              </Button>
                              <Button
                                variant="contained" color="success" startIcon={<CheckCircleIcon />}
                                onClick={() => handleVerify(u.PHONE)}
                                sx={{ borderRadius: "50px", textTransform: "none", fontWeight: 800, px: 3 }}
                              >
                                Zatwierdź
                              </Button>
                            </>
                          )}

                          {isVerified && (
                            <Button
                              variant="outlined" color="error" startIcon={<DeleteForeverIcon />}
                              onClick={() => handleDelete(u.PHONE, false)}
                              disabled={isMe}
                              sx={{ borderRadius: "50px", textTransform: "none", fontWeight: 800, px: 3, borderWidth: 2 }}
                            >
                              Usuń Konto
                            </Button>
                          )}
                        </Box>

                      </Paper>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Paper>

        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
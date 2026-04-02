import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useUser } from "../../contexts/UseUser";
import { useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const formFields = [
  { label: "Imię i nazwisko", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Telefon", name: "phone", type: "text" },
  { label: "Hasło", name: "password", type: "password" },
  { label: "Klub / Organizacja", name: "club", type: "text" },
  { label: "Rola w systemie", name: "role", type: "text" },
];

const UserProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    password: user?.password || "",
    club: user?.club || "",
    role: user?.role || "",
    email: user?.email || "",
    phone: user?.phone || "",
    verify: user?.verify || false,
    avatar: user?.avatar || "",
  });

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    user?.avatar || null
  );

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const navigate = useNavigate();


  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser({
        name: user.name,
        password: user.password,
        club: user.club,
        role: user.role,
        email: user.email,
        phone: user.phone,
        verify: user.verify,
        avatar: user.avatar || "",
      });
      setAvatar(user.avatar || null);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-profile",
        { ...editedUser, avatar: avatar as string }
      );

      if (response.data.success) {
        setUser({ ...editedUser, avatar: avatar as string });
        setIsEditing(false);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete-user/${user?.phone}`
      );
      if (response.data.success) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    setOpenConfirmDialog(false);
  };

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box textAlign="center" mb={5} position="relative">
        <Avatar
          alt={user.name}
          src={avatar ? String(avatar) : ""}
          sx={{ 
            width: 130, height: 130, margin: "0 auto", 
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            border: "4px solid #fff",
            outline: "3px solid #00B4D8"
          }}
        />
        {isEditing && (
          <Box mt={2}>
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <label htmlFor="avatar-upload">
              <Button 
                variant="outlined" 
                component="span" 
                startIcon={<PhotoCameraIcon />}
                sx={{ borderRadius: "50px", fontWeight: 700, mt: 1, borderColor: "#00B4D8", color: "#00B4D8", "&:hover": { borderWidth: 2 } }}
              >
                Zmień zdjęcie
              </Button>
            </label>
          </Box>
        )}
      </Box>

      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }} 
        gap={3}
      >
        {formFields.map((field) => (
          <Box key={field.name}>
            <TextField
              label={field.label}
              name={field.name}
              type={field.type}
              value={editedUser[field.name as keyof typeof editedUser]}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: isEditing ? "#fff" : "rgba(0,0,0,0.02)",
                  "&.Mui-focused fieldset": { borderColor: "#00B4D8", borderWidth: 2 },
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4, opacity: 0.5 }} />

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} justifyContent="space-between">
        {!isEditing ? (
          <>
            <Button 
              variant="outlined" 
              startIcon={<DeleteForeverIcon />} 
              onClick={() => setOpenConfirmDialog(true)} 
              color="error"
              sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 800, borderWidth: 2, "&:hover": { borderWidth: 2 } }}
            >
              Usuń Konto
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<SaveIcon />}
              onClick={handleSaveClick} 
              sx={{ flexGrow: 1, borderRadius: "50px", py: 1.5, fontWeight: 800 }}
            >
              Zapisz Zmiany
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleCancelClick} 
              sx={{ flexGrow: 1, borderRadius: "50px", py: 1.5, fontWeight: 800, color: "text.secondary", borderColor: "text.disabled" }}
            >
              Anuluj
            </Button>
          </>
        )}
      </Box>

      <Dialog 
        open={openConfirmDialog} 
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 400 } }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
          <WarningAmberIcon sx={{ fontSize: 60, color: "error.main", mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 900, color: "error.main" }}>
            Strefa Zagrożenia
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            Czy na pewno chcesz usunąć swoje konto z systemu? Stracisz dostęp do swojej bazy zawodników oraz narzędzi skautingowych. <br/><br/>
            <strong>Tej operacji nie można cofnąć!</strong>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
          <Button onClick={() => setOpenConfirmDialog(false)} sx={{ fontWeight: 800, color: "text.secondary" }}>
            Anuluj
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error" sx={{ borderRadius: "50px", px: 4, fontWeight: 800 }}>
            Potwierdź Usunięcie
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
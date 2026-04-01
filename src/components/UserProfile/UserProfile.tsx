import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useUser } from "../UseUser/UseUser";
import { useNavigate } from "react-router-dom";

const formFields = [
  { label: "Imię i nazwisko", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Telefon", name: "phone", type: "text" },
  { label: "Hasło", name: "password", type: "password" },
  { label: "Klub", name: "club", type: "text" },
  { label: "Rola", name: "role", type: "text" },
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
        {
          name: editedUser.name,
          password: editedUser.password,
          club: editedUser.club,
          email: editedUser.email,
          phone: editedUser.phone,
          role: editedUser.role,
          avatar: avatar as string,
        }
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
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete-user/${user?.phone}`
      );
      if (response.data.success) {
        setUser(null);
        navigate("/login");
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    handleCloseConfirmDialog();
  };

  if (!user) {
    return <Typography variant="h6">Brak danych użytkownika.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "2rem auto", borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Mój Profil
      </Typography>
      <Box textAlign="center" mb={4}>
        <Avatar
          alt={user.name}
          src={avatar ? String(avatar) : "/avatar.jpg"}
          sx={{ width: 120, height: 120, margin: "0 auto", boxShadow: 3 }}
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
              <Button variant="outlined" color="primary" component="span" sx={{ borderRadius: 2 }}>
                Zmień Awatar
              </Button>
            </label>
          </Box>
        )}
      </Box>
      <Grid container spacing={3}>
        {formFields.map((field) => (
          <Grid item xs={12} key={field.name}>
            <TextField
              label={field.label}
              name={field.name}
              type={field.type}
              value={editedUser[field.name as keyof typeof editedUser]}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "standard"}
            />
          </Grid>
        ))}
        
        <Grid item xs={12} mt={2}>
          {!isEditing ? (
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ borderRadius: 2 }}>
                Edytuj profil
              </Button>
              <Button variant="outlined" color="error" onClick={handleOpenConfirmDialog} sx={{ borderRadius: 2 }}>
                Usuń konto
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap={2}>
              <Button variant="contained" color="success" onClick={handleSaveClick} sx={{ flexGrow: 1, borderRadius: 2 }}>
                Zapisz
              </Button>
              <Button variant="outlined" color="primary" onClick={handleCancelClick} sx={{ flexGrow: 1, borderRadius: 2 }}>
                Anuluj
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>Potwierdzenie usunięcia</DialogTitle>
        <DialogContent>
          <Typography>
            Czy na pewno chcesz usunąć swoje konto? Tej czynności nie można cofnąć.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseConfirmDialog} variant="outlined" color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserProfile;
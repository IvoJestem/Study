import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { Users } from "../Users/Users";

const UserProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Users>({
    name: user?.name || "",
    password: user?.password || "",
    club: user?.club || "",
    role: user?.role || "",
    email: user?.email || "",
    phone: user?.phone || 0,
    verify: user?.verify || true,
    avatar: user?.avatar || "",
  });
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    user?.avatar || null
  );

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

  const handleSaveClick = () => {
    setUser({ ...editedUser, avatar: avatar as string });
    setIsEditing(false);
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

  if (!user) {
    return <Typography variant="h6">Brak danych użytkownika.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Mój Profil
      </Typography>
      <Box textAlign="center" mb={3}>
        <Avatar
          alt={user.name}
          src={avatar ? String(avatar) : "/avatar.jpg"}
          sx={{ width: 120, height: 120, margin: "0 auto" }}
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
              <Button variant="contained" color="primary" component="span">
                Zmień Avatar
              </Button>
            </label>
          </Box>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Imię i Nazwisko"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Telefon"
            name="phone"
            type="number"
            value={editedUser.phone}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hasło"
            name="password"
            type="password"
            value={editedUser.password}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Klub"
            name="club"
            value={editedUser.club}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Rola"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          {!isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edytuj
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveClick}
              >
                Zapisz
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCancelClick}
                sx={{ ml: 2 }}
              >
                Anuluj
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;

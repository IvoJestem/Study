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
} from "@mui/material";
import { useUser } from "../../contexts/UserContext";

const UserProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: user?.id || "",
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser({
        id: user.id,
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
      const response = await axios.post("/api/update-profile", {
        id: editedUser.id, // Ensure ID is included
        name: editedUser.name,
        password: editedUser.password,
        club: editedUser.club,
        email: editedUser.email,
        phone: editedUser.phone,
        role: editedUser.role,
        avatar: avatar as string,
      });

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

  if (!user) {
    return <Typography variant="h6">No user data available.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        My Profile
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
                Change Avatar
              </Button>
            </label>
          </Box>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Full Name"
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
            label="Phone"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            variant={isEditing ? "outlined" : "standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
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
            label="Club"
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
            label="Role"
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
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveClick}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCancelClick}
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;

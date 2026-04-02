import React from "react";
import { TableCell, TableRow, Typography, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface PlayerInfoProps {
  name: string;
  position: string;
  age: number;
  nation: string;
  club: string;
  price: string;
}

export const CardInfo: React.FC<PlayerInfoProps> = ({
  name,
  position,
  age,
  nation,
  club,
  price,
}) => {
  return (
    <TableRow 
      hover 
      sx={{ 
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "rgba(0, 180, 216, 0.06)",
          transform: "scale(1.005)", 
        }
      }}
    >
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: "rgba(0, 180, 216, 0.1)", 
              color: "#00B4D8", 
              width: 36, 
              height: 36,
              boxShadow: "0 2px 8px rgba(0, 180, 216, 0.2)"
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
          <Typography sx={{ fontWeight: 800, color: "#0A1929" }}>
            {name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
          {position}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#0A1929" }}>
          {age}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
          {nation}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#0A1929" }}>
          {club}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography sx={{ fontWeight: 900, color: "#FF007A", letterSpacing: 0.5 }}>
          {price}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
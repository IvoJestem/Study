import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Player, initialPlayer } from "../../components/Database/Database";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import CardTable from "../../components/CardTable/CardTable";

const TransferList: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards] = useState<Player[]>(initialPlayer);

  return (
    <Container>
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.paper",
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          {!isMenuOpen && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsMenuOpen(true)}
            >
              Open Menu
            </Button>
          )}
          <Typography variant="h4">Lista Transferowa</Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>
          <CardTable cards={cards} /> {/* Używamy CardTable */}
        </Box>
      </Box>
    </Container>
  );
};

export default TransferList;

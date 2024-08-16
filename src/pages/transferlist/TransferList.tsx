import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Player, initialPlayer } from "../../components/Database/Database";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import CardTable from "../../components/CardTable/CardTable.tsx";

const TransferList: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cards] = useState<Player[]>(initialPlayer);

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          backgroundColor: "#fff",
          padding: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        {!isMenuOpen && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsMenuOpen(true)}
            sx={{
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            Open Menu
          </Button>
        )}
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Lista Transferowa
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          backgroundColor: "#fff",
          padding: 3,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <CardTable cards={cards} />
      </Box>
    </Container>
  );
};

export default TransferList;

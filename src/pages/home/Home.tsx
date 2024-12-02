import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../../components/opinions/opinions";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGetStartedClick = () => {
    alert("Witaj użytkowniku, na naszej stronie");
  };

  const handleLogoClick = () => {
    navigate("/userprofilepage");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        padding: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: 2,
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={toggleMenu}
          sx={{ color: theme.palette.primary.main }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleLogoClick} sx={{ textDecoration: "none" }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          padding: 3,
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
          flexGrow: 1,
        }}
      >
        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            backgroundColor: theme.palette.primary.main,
            padding: 4,
            boxShadow: 3,
            borderRadius: 3,
            backgroundImage:
              "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
            color: "#fff",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
            Welcome to Our Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Discover our offerings. Use the menu to explore various sections.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ paddingX: 4 }}
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </Box>

        {/* Offerings Section */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            What We Offer
          </Typography>
          <Typography variant="body1">
            We offer assistance in recruiting new players to your team.
          </Typography>
        </Box>

        {/* Testimonials Section */}
        <Box
          component="section"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            backgroundColor: "#fff",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Testimonials
          </Typography>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ padding: 2 }}>
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{
                    width: 64,
                    height: 64,
                    margin: "0 auto",
                    marginBottom: 2,
                    boxShadow: 2,
                  }}
                />
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 1 }}>
                  "{testimonial.content}"
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  - {testimonial.name}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          boxShadow: 2,
          marginTop: "auto",
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
          borderTop: `3px solid ${theme.palette.primary.light}`,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box component="nav">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=6yP4Nm86yk0",
                      "_blank"
                    )
                  }
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    display: "block",
                  }}
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  onClick={() =>
                    window.open("../../../public/services.pdf", "_blank")
                  }
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    display: "block",
                  }}
                >
                  Services
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => window.open("mailto:mail@mail.pl")}
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    display: "block",
                  }}
                >
                  Contact
                </Button>
              </li>
            </ul>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              onClick={() => window.open("https://www.facebook.com", "_blank")}
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Facebook
            </Button>
            <Button
              onClick={() => window.open("https://twitter.com", "_blank")}
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Twitter
            </Button>
            <Button
              onClick={() => window.open("https://www.instagram.com", "_blank")}
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Instagram
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

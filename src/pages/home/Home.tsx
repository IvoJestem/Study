import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Avatar } from "@mui/material";
import SlideOutMenu from "../../components/SlideOutMenu/SlideOutMenu";
import MenuIcon from "@mui/icons-material/Menu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "John Doe",
    content: "This service is amazing! I highly recommend it to everyone.",
    avatar: "/path-to-avatar1.jpg",
  },
  {
    name: "Jane Smith",
    content: "Excellent customer service and fantastic results!",
    avatar: "/path-to-avatar2.jpg",
  },
  {
    name: "Sam Wilson",
    content: "A seamless experience from start to finish. Great job!",
    avatar: "/path-to-avatar3.jpg",
  },
];

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        backgroundColor: "#f5f5f5",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: 1,
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
        }}
      >
        <IconButton onClick={toggleMenu} sx={{ color: "primary.main" }}>
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
          <img src="/pic.jpg" alt="Logo" style={{ maxHeight: "50px" }} />
        </Box>
      </Box>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box
        component="main"
        sx={{
          padding: 3,
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
        }}
      >
        <Box
          component="section"
          sx={{
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            Welcome to Our Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Discover our offerings. Use the menu to explore various sections.
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Box>

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
            boxShadow: 1,
            borderRadius: 2,
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

      <Box
        component="footer"
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: 1,
          marginTop: "auto",
          transition: "margin-left 0.3s ease",
          marginLeft: isMenuOpen ? "250px" : "0",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box component="nav">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=6yP4Nm86yk0"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="../../../public/services.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="mailto:mail@mail.pl"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Instagram
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../../assets/logo.svg";
import leaderboard from "../../assets/leaderboard.png";
import schedule from "../../assets/schedule.png";
import { Link } from "react-router-dom";

export const navBarSize = {
  height: "60px",
  logo: {
    width: "110px",
  },
  button: {
    variant: "h2",
    fontSize: "16px",
    color: "#FFFFFF",
  },
  icon: { height: "24px", width: "24px", marginRight: "8px" },
};
export const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#025FEB", height: navBarSize.height, pl: 0, m: 0 }}>
      <Toolbar
        sx={{
          "@media": {
            p: 0,
          },
        }}
      >
        <Typography variant="h6" component="div" sx={{ pl: "40px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "40px", width: "110px", verticalAlign: "middle", m: 0, pl: 0 }} />
          </Link>
        </Typography>
        <Box sx={{ ml: "auto", mr: "40px", display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/schedule" sx={{ textTransform: "none", display: "flex", alignItems: "center" }}>
            <img src={schedule} alt="Schedule" style={navBarSize.icon} />
            <Typography sx={{ ...navBarSize.button }}>Schedule</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/leaderboard" sx={{ textTransform: "none", display: "flex", alignItems: "center", ml: 2 }}>
            <img src={leaderboard} alt="Leaderboard" style={navBarSize.icon} />
            <Typography sx={{ ...navBarSize.button }}>Leaderboard</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

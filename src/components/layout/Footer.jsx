import { Box, Paper, Divider, Typography, SxProps } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const footerSize = {
  heigh: "40px",
};

export const Footer = ({ sx }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "#F6F7F7",
        position: "fixed",
        borderRadius: 0,
        textAlign: "center",
        width: "100%",
        height: footerSize.heigh,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        m: 0,
        p: 0,
        ...(sx || {}),
      }}
      elevation={6}
    >
      <Box display="flex" sx={{ justifyContent: "space-between", alignItems: "center", width: "auto", ml: 1 }}>
        <Typography variant="body1" fontSize={12}>
          Developed by Luis Gerardo - 2024
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, ml: 1 }}>
          <a href="https://github.com/LuisGerar321" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
          <a href="https://www.linkedin.com/in/luis-gerardo-camara-salinas321/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            <LinkedInIcon sx={{ fontSize: 30 }} />
          </a>
        </Box>
      </Box>
      <Typography sx={{ mr: "40px", p: 0 }} variant="body2">
        API Version: 1.0
      </Typography>
    </Paper>
  );
};

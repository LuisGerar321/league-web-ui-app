import { Typography } from "@mui/material";
import React from "react";

export const Heading = ({ children }) => {
  return (
    // Set margin-top to 40px in x small view instead of 60px to ensure the pagination toolbar is visible and properly aligned.
    <Typography variant="h1" sx={{ mt: { xs: "40px", lg: "60px" }, mb: "20px" }}>
      {children}
    </Typography>
  );
};

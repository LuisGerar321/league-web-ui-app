import { Box } from "@mui/material";
import React from "react";
import notFound from "../assets/404.png";

export const NotFound = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <img width="400px" height="400px" src={notFound}></img>
    </Box>
  );
};

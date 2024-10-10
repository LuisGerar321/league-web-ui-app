import { Box, Typography } from "@mui/material";
import React from "react";
import { Heading } from "../components/Heading";
import { Leaderboard } from "../components/Leaderboard";

export const LeaderboardPage = () => {
  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
      <Heading>League Standings</Heading>
      <Leaderboard></Leaderboard>
    </Box>
  );
};

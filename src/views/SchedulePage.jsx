import { Box } from "@mui/material";
import React from "react";
import { LeagueScheduleTable } from "../components/LeagueScheduleTable";
import { Heading } from "../components/Heading";

export const SchedulePage = () => {
  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
      <Heading>League Schedule</Heading>
      <LeagueScheduleTable></LeagueScheduleTable>
    </Box>
  );
};

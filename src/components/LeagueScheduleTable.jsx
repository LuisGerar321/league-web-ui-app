import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Box } from "@mui/material";
import LeagueService from "../services/LeagueService";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}.${day}.${year} ${hours}:${minutes}`;
};

export const LeagueScheduleTable = () => {
  const leageService = new LeagueService();
  const rowsPerPageOptions = [6];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    leageService
      .fetchData()
      .then(() => setMatches(leageService.getMatches()))
      .catch(() => console.error("Server Response with error."));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "90%", m: 0, p: 0 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#E4EDF2", height: "40%" }}>
            <TableRow>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="h2">Date Time</Typography>
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}>
                <Typography variant="h2">Stadium</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ ml: "auto", textAlign: "right" }} variant="h2">
                  Home Team
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="h2"> Away Team</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((match, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "white" : "#F6F7F7", height: "70px" }}>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{formatDate(match.matchDate)}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}>{match.stadium}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", m: 0, p: 0 }}>
                    <Typography sx={{ mr: 2, mb: 0, mt: 0, p: 0 }} variant="h3">
                      {match.homeTeam}
                    </Typography>
                    <img style={{ m: 0, p: 0 }} width="53px" height="37px" src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`}></img>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="h3">{`${match.homeTeamScore} : ${match.awayTeamScore}`}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", m: 0, p: 0 }}>
                    <img style={{ m: 0, p: 0 }} width="53px" height="37px" src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`}></img>
                    <Typography sx={{ ml: 2, mb: 0, mt: 0, p: 0 }} variant="h3">
                      {match.awayTeam}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={matches?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

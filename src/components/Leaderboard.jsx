import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Box } from "@mui/material";
import LeagueService from "../services/LeagueService";

export const Leaderboard = () => {
  const leageService = new LeagueService();
  const rowsPerPageOptions = [6];
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    leageService
      .fetchData()
      .then(() => leageService.getMatches())
      .then(() => setLeaderBoard(leageService.getLeaderboard()))
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
              <TableCell>
                <Typography variant="h2">Team name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h2">MP</Typography>
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="h2">GF</Typography>
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="h2">GA</Typography>
              </TableCell>
              <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                <Typography variant="h2">GD</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h2"> Points</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderBoard?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((leaderBoard, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "white" : "#F6F7F7", height: "70px" }}>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", m: 0, p: 0 }}>
                    <img style={{ m: 0, p: 0 }} width="53px" height="37px" src={`https://flagsapi.codeaid.io/${leaderBoard.teamName}.png`}></img>
                    <Typography sx={{ ml: 2, mb: 0, mt: 0, p: 0 }} variant="h3">
                      {leaderBoard.teamName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{leaderBoard.matchesPlayed}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{leaderBoard.goalsFor}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{leaderBoard.goalsAgainst}</TableCell>
                <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>{leaderBoard.goalsFor - leaderBoard.goalsAgainst}</TableCell>

                <TableCell sx={{ color: "blue" }}>{leaderBoard.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={leaderBoard?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

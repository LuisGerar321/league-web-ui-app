import React from "react";
import { Route, Routes } from "react-router-dom";
import { SchedulePage } from "./views/SchedulePage";
import { LeaderboardPage } from "./views/LeaderboardPage";
import { Main } from "./components/layout/Main";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <SchedulePage></SchedulePage>{" "}
            </Main>
          }
        />
        <Route
          path="/schedule"
          element={
            <Main>
              <SchedulePage></SchedulePage>
            </Main>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Main>
              <LeaderboardPage></LeaderboardPage>
            </Main>
          }
        />
        <Route
          path="*"
          element={
            <Main>
              <NotFound></NotFound>
            </Main>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;

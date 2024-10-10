import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Main = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: "100vw", height: "100vh", justifyContent: "flex-start", alignItems: "flex-start" }}>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
    </Box>
  );
};

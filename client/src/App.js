import "./App.css";
import React from "react";
import Main from "./pages/Main";
import Box from "@mui/material/Box";

function App() {
  return (
      <Box
          className="App"
          sx={{
            minHeight: "100vh",
          }}
      >
        <Main />
      </Box>
  );
}

export default App;


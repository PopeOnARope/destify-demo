import React from "react";
import "./App.css";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./features/layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#28a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

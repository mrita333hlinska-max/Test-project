import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "./App.css";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

export default App;

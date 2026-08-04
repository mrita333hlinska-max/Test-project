import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "./App.css";
import theme from "./theme";
import StartPage from "./pages/start/StartPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StartPage />
    </ThemeProvider>
  );
}

export default App;

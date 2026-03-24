import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3c85bc",
    },
    secondary: {
      main: "#fafafa",
    },
    background: {
      default: "#ffffff",
      paper: "#fffdf8",
    },
    text: {
      primary: "#222222",
      secondary: "#3c85bc",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
      lineHeight: 0.94,
      fontWeight: 800,
      letterSpacing: "-0.06em",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    body1: {
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e",
    },
    secondary: {
      main: "#d97706",
    },
    background: {
      default: "#f4efe6",
      paper: "#fffdf8",
    },
    text: {
      primary: "#1f2937",
      secondary: "#52606d",
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

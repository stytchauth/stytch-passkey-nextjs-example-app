import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'IBM Plex Sans', sans-serif;",
      textTransform: "none",
    },
    h1: {
      fontSize: 40,
      lineHeight: "60px",
      fontWeight: 500,
    },
    h2: {
      fontSize: 30,
      lineHeight: "40px",
      fontWeight: 500,
    },
    h3: {
      fontSize: 24,
      lineHeight: "30px",
      fontWeight: 500,
    },
    caption: {
      fontSize: 16,
      lineHeight: "20px",
    },
    body1: {
      fontSize: 18,
      lineHeight: "25px",
    },
  },
});

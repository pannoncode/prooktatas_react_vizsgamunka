import { createTheme } from "@mui/material/styles";

// const obsidian = "#020403";
// const charcoal = "#28231D";
const eggshell = "#F9FEFF";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5c6bc0",
    },
    secondary: {
      main: "#fce4ec",
    },
  },
  primary: {
    main: `${eggshell}`,
  },
  secondary: {
    main: "#f5f5f5",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#2f3d7e",
        },
      },
    },
  },
});

export default theme;

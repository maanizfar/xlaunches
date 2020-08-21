import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    common: {
      black: "#0F1112",
    },
    background: {
      default: "#0F1112",
      paper: "#22272B",
    },
    primary: {
      main: "#0F1112",
    },
    secondary: {
      main: "#0693FB",
    },
    text: {
      secondary: "#0693FB",
    },
  },
  typography: {
    fontFamily: [
      "Saira Semi Condensed",
      "Roboto",
      "Helvetica",
      "cursive",
      "Arial",
      "sans-serif",
      "Iceberg",
    ].join(","),
  },
});

export default theme;

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
      secondary: "#A7A9AC",
    },
  },
  typography: {
    h3: {
      fontSize: "2rem",

      "@media (min-width: 960px)": {
        fontSize: "3rem",
      },
    },
    h5: {
      fontSize: "1.25rem",

      "@media (min-width: 960px)": {
        fontSize: "1.5rem",
      },
    },
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

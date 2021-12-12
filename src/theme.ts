import { createTheme } from "@material-ui/core/styles";

const primary = "#1976d2"; //C68B59;
const secondary = "#FF5200";

const theme: {
  [key: string]: any;
} = {
  palette: {
    background: {
      default: "rgba(232,237,245,1)",
    },

    primary: {
      light: "rgba(28, 63, 183, 0.2)",
      main: "rgba(28, 63, 183, 1)",
    },

    secondary: {
      main: "rgb(30,41,59)",
    },
  },
};

export default createTheme(theme);

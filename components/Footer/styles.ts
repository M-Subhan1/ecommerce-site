import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      fontSize: "0.80rem",
    },

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "3rem",
    },

    footerSection: {
      marginTop: "1.5rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },

    CopyrightIcon: {
      marginRight: "4px",
      fontSize: "1rem",
    },
  })
);

export default useStyles;

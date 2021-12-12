import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    headings: {
      alignSelf: "flex-start",
      fontFamily: "Inter, sans-serif",
    },

    primaryHeading: {
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      color: "rgb(45, 55, 72)",
    },

    label: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13.5,
      fontWeight: 500,
      color: "rgb(45, 55, 72)",
      margin: "30px 0 10px 0",
      letterSpacing: "1.15px",
    },

    lastLabel: {
      margin: "20px 0 10px 0",
    },

    form: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      padding: "10px",
    },

    btnContainer: {
      marginTop: "-2px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);

export default useStyles;

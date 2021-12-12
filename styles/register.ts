import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        marginTop: "4rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        marginTop: "5rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.xs)]: {
        marginTop: "rem",
      },
    },
    primaryHeading: {
      fontWeight: 500,
      color: "rgb(45, 55, 72)",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%", // Fix IE 11 issue.
    },

    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      padding: "10px 16px 10px 16px",
      margin: theme.spacing(3, 0, 2),
    },

    gridLeft: {
      paddingRight: "10px",
    },

    link: {
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
      },
    },

    label: {
      marginTop: "10px",
    },

    gridRight: {
      paddingLeft: "10px",
    },

    [`${theme.breakpoints.down(theme.breakpoints.values.md)}`]: {
      gridLeft: {
        padding: 0,
      },

      gridRight: {
        padding: 0,
      },
    },
  })
);

export default useStyles;

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
    },
    headingContainer: {
      padding: "7rem",
      display: "flex-column",
      alignItems: "center",
    },
    catchPhrase: {
      fontSize: "0.85rem",
    },
    heading: {
      fontSize: "3.75rem",
      fontWeight: 100,
      marginBottom: theme.spacing(3.5),
    },
    subHeading: {
      fontSize: "1.1rem",
      color: "black",
      fontWeight: 100,
      marginBottom: theme.spacing(7),
    },
    image: {
      padding: "3rem",
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      fontSize: "1rem",
      color: "white",
      padding: "1rem",
      borderRadius: "5px",
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
      headingContainer: {
        padding: "2rem",
      },
      heading: {
        fontSize: "3rem",
      },
    },

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      root: {
        minHeight: "80vh",
      },
      headingContainer: {
        padding: "1rem",
      },
      heading: {
        fontSize: "2.5rem",
      },
      image: {
        display: "none",
      },
      subHeading: {
        fontSize: "0.95rem",
        fontWeight: 400,
        // marginBottom: theme.spacing(5),
      },
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      root: {
        minHeight: "73vh",
      },
    },
  })
);

export default useStyles;

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "2rem",
      minHeight: "100vh",
      //   backgroundColor: "white",
      backgroundColor: theme.palette.common.white,
    },
    container: {
      minHeight: "80vh",
      backgroundColor: theme.palette.common.white,
    },
    textContainer: {
      backgroundColor: theme.palette.common.black,
      padding: "7rem",
      color: theme.palette.common.white,
    },
    textHeading: {
      marginBottom: "1rem",
    },
    formContainer: {
      backgroundColor: theme.palette.background.default,
      padding: "4rem",
    },
    headingsContainer: {
      marginBottom: "1rem",
    },
    heading: {
      marginBottom: "2rem",
      color: theme.palette.primary.main,
    },
    subheading: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "#121212",
    },
    group: {
      margin: "1rem 0rem",
    },
    textarea: {
      marginBottom: "2rem",
    },
    submitBtn: {
      borderRadius: "0px",
      padding: "0.8rem 1.25rem",
    },
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      textContainer: {
        padding: "2rem",
      },
      root: {
        marginTop: "5rem",
      },
      formContainer: {
        backgroundColor: theme.palette.background.default,
        padding: "2rem",
      },
    },
  })
);

export default useStyles;

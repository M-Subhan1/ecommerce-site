import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "2rem",
      width: "100%",
      backgroundColor: "white",
      [theme.breakpoints.up("lg")]: {
        minHeight: "20rem",
      },
      [theme.breakpoints.up("md")]: {
        minHeight: "22rem",
      },
      [theme.breakpoints.down("sm")]: {
        minHeight: "20rem",
        padding: "4rem 2rem",
      },
    },
    heading: {
      fontSize: "1.1rem",
      color: theme.palette.secondary.light,
      fontWeight: 500,
      marginBottom: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    icon: {
      display: "flex",
      justifyContent: "center",
    },
    span: {
      marginTop: theme.spacing(1.5),
      fontSize: "1.5rem",
    },
    cardContent: {},
  })
);

export default useStyles;

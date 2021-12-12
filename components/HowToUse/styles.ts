import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10),
    },
    heading: {
      marginBottom: "2rem",
      fontSize: "2rem",
      color: theme.palette.primary.main,
    },
    gridItem: {
      padding: "1.25rem",
    },
    tagline: {
      marginBottom: "2.5rem",
    },
    card: {
      width: "100%",
      minHeight: "20rem",
      backgroundColor: "white",
    },
  })
);

export default useStyles;

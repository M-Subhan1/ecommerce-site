import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "5rem",
      minHeight: "70vh",
      width: "100%",
    },
    title: {
      display: "inline-block",
      padding: "0.5rem",
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    inputContainer: {
      padding: "1rem",
    },
    gridContainer: {
      minHeight: "40vh",
      alignContent: "center",
    },
  })
);

export default useStyles;

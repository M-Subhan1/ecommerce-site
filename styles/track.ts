import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
    },
    innerContainer: {
      backgroundColor: theme.palette.background.paper,
      padding: "3rem",
      borderBottom: `4px solid ${theme.palette.primary.main}`,
    },
    headingContainer: {
      display: "inline-block",
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      padding: "0.25rem 3rem",
      marginBottom: "2rem",
      justifySelf: "center",
    },
    gridItem: {
      marginBottom: "1rem",
    },
    btn: {
      marginTop: "2rem",
      borderRadius: "0",
      padding: "0.5rem 1rem",
    },
    form: {
      width: "100%",
    },
  })
);

export default useStyles;

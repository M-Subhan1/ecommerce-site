import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      marginTop: "3rem",
      padding: "5rem 0rem",
      minHeight: "75vh",
    },
    heading: {
      padding: "0.5rem 1.5rem",
      display: "inline-block",
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      marginBottom: "2rem",
    },
    text: {
      lineHeight: "2rem",
    },
  })
);

export default useStyles;

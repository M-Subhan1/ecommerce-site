import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
        padding: "4rem 10rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        padding: "4rem 2rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        padding: "4rem 0rem",
      },
      marginBottom: "6rem",
    },
    heading: {
      fontWeight: 400,
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(5),
    },
    gridItems: {
      padding: "2rem",
    },
  })
);

export default useStyles;

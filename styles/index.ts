import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      padding: "3rem",

      [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
        padding: "4rem 10rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        padding: "4rem 2rem",
      },
      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        padding: "4rem 0rem",
      },
    },

    gridItem: {
      padding: "2rem",
    },

    gridFilters: {
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        padding: "0rem",
        height: "6rem",
        marginLeft: "-5rem",
      },
    },

    product: {
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        marginTop: "4rem",
      },
    },
    formControl: {
      margin: theme.spacing(6),
      minWidth: "100%",
    },

    outOfStock: {
      backgroundColor: "red",
      padding: "5px",
      color: "white",
      textAlign: "center",
    },
  })
);

export default useStyles;

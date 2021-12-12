import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      marginTop: "8rem",
      minHeight: "70vh",
    },

    detailsContainer: {
      padding: "1.5rem",
      width: "100%",
    },

    itemContainer: {
      padding: "2rem",
      marginBottom: "5rem",
    },

    title: {
      marginBottom: "3rem",
    },

    description: {
      marginBottom: "3rem",
    },

    button: {
      padding: "1rem",
    },

    outOfStock: {
      backgroundColor: "red",
      color: "white",
      padding: "1rem 0.70rem 1rem 0.70rem",
      borderRadius: "3px",
    },
  })
);

export default useStyles;

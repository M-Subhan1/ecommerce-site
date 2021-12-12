import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    discount: {
      color: "red",
      padding: "5px 10px",
      borderRadius: "15px",
      fontWeight: 500,
      fontSize: "0.75rem",
      border: "2px solid red",
    },
    new: {
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
    image: {
      padding: "3rem 0.25rem",
      display: "flex",
      justifyContent: "center",
    },
    pricing: {
      padding: "0 1rem",
    },
    title: {
      fontWeight: 500,
      fontSize: "1rem",
      marginBottom: theme.spacing(2),
    },
    price: {
      fontWeight: 500,
      marginRight: "5px",
      fontSize: "1rem",
      color: theme.palette.primary.main,
    },
    hover: {
      cursor: "pointer",
    },
    slashed: {
      fontWeight: 100,
      fontSize: "0.75rem",
      textDecoration: "line-through",
    },
    plusContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1rem",
      "& span": {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "0.60rem 0rem ",
      },
    },
  })
);

export default useStyles;

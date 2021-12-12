import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    },
    container: {
      marginTop: theme.spacing(20),
      marginBottom: theme.spacing(30),
    },

    empty: {
      width: "100%",
      fontWeight: 400,
      fontSize: "1.5rem",
    },

    imageContainer: {
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
    },

    cancelIcon: {
      position: "absolute",
      left: 64,
      top: -6,
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },

    buttonContainer: {
      marginTop: theme.spacing(4),
      width: "100%",
      "& span": {
        fontSize: "1rem",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "25px",
        padding: "1rem",
        color: theme.palette.common.white,
      },
    },

    gridItem: {
      padding: theme.spacing(10),
    },
    orderDetails: {
      backgroundColor: theme.palette.common.white,
      "& h6": {
        fontSize: "0.80rem",
        fontWeight: 500,
      },
      "& h5": {
        fontSize: "0.75rem",
        color: theme.palette.grey[600],
        textTransform: "upperCase",
        fontWeight: 700,
        letterSpacing: "0.10rem",
      },
    },
    checkoutContainer: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(2),
    },
    button: {
      padding: "1rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
    row: {
      padding: "1.25rem",
    },
    productId: {
      color: theme.palette.grey[600],
    },
    paymentDetails: {
      padding: theme.spacing(8),
      backgroundColor: theme.palette.primary.light,
    },
    checkoutBtn: {
      margin: "0 0 2rem 1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.25rem 2rem",
      borderRadius: "30px",
      fontWeight: 700,
      fontSize: "0.7rem",
      color: theme.palette.grey[400],
      letterSpacing: "0.3rem",
      textTransform: "uppercase",
      backgroundColor: "#121212",
      transition: "all 0.3s ease-out",

      "&:hover": {
        transform: "translate(0, -3px)",
        backgroundColor: "#121212",
        color: theme.palette.grey[400],
      },
      "&:active": {
        transform: "translate(0, 1px)",
        backgroundColor: "#121212",
        color: theme.palette.grey[400],
      },
    },
    line: {
      margin: "0rem 0 5rem 1rem",
      backgroundColor: theme.palette.common.black,
      width: "80%",
      height: "5px",
    },
    cartTotal: {
      marginLeft: "1rem",
      letterSpacing: "0.15rem",
      color: theme.palette.grey[600],
      marginBottom: theme.spacing(8),
      fontWeight: 700,
      fontSize: "0.7rem",
      textTransform: "uppercase",
      "& span": {
        marginLeft: "10px",
        fontSize: "1.25rem",
        color: "#121212",
        fontWeight: 500,
        textTranform: "none",
      },
    },
    message: {
      fontSize: "0.70rem",
      fontWeight: 300,
      color: "#121212",
      textTransform: "none",
    },
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      gridItem: {
        padding: theme.spacing(5),
      },
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      gridItem: {
        padding: theme.spacing(1),
      },
    },
  })
);

export default useStyles;

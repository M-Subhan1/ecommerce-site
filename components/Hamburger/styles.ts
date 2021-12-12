import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.35)",
      width: "100vw",
      height: "100vh",
      zIndex: theme.zIndex.appBar + 1,
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    hamburgerContainer: {
      padding: "2rem 3rem",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.black,
      width: "90vw",
      height: "100vh",
      zIndex: theme.zIndex.appBar + 2,
      fontSize: "2rem",
      fontWeight: 500,
      [theme.breakpoints.up("sm")]: {
        width: "400px",
      },
    },
    hamburgerIcons: {
      marginTop: "2rem",
      fontSize: "1rem",
      fontWeight: 500,
      display: "flex",
      justifyContent: "space-between",
    },
    cartItems: {
      fontSize: "0.85rem",
      padding: "0 4px",
      borderRadius: "100%",
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    logo: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "3rem",
    },
    link: {
      // marginBottom: "1.5rem",
      fontWeight: 400,
      fontSize: "1.1rem",
      cursor: "pointer",
      padding: "0.75rem",
    },
    selectedLink: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  })
);

export default useStyles;

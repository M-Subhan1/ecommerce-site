import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.common.white,
      height: "4.5rem",
      padding: "1.5rem 2rem",
      // marginBottom: "4.5rem",
    },
    logoContainer: {
      width: "100%",
      fontWeight: 400,
      fontSize: "1.25rem",
    },

    grid: {
      "& > :last-child": {
        display: "flex",
        justifyContent: "flex-end",
      },
      height: "100%",
      color: theme.palette.common.black,
    },
    cartItems: {
      margin: "0 1rem 0 0.25rem",
      fontSize: "0.8rem",
      padding: "0 3px",
      borderRadius: "100%",
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },

    hidden: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      hidden: {
        display: "flex",
      },
      logoContainer: {
        padding: "1.5rem",
      },
      hamburgerIcon: {
        display: "none",
      },

      toolbar: {
        height: "5rem",
        padding: "0",
        borderBottom: `1px solid ${theme.palette.primary.light}`,
      },
      signInButton: {
        fontWeight: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        height: "100%",
        fontSize: "0.9rem",
        "& span": {
          marginLeft: "10px",
        },
      },

      btn: {
        alignSelf: "center",
        padding: "1rem",
        height: "2.75rem",
        borderRadius: "0",
        margin: "0 1.5rem",
      },

      cartIcon: {
        display: "flex",
        alignText: "center",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  })
);

export default useStyles;

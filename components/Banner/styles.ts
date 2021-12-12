import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "10vh",
      backgroundColor: theme.palette.common.black,
      color: "white",
      "& h6": {
        fontSize: "1.15rem",
        fontWeight: 400,
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          fontSize: "0.95rem",
        },
      },
    },
  })
);

export default useStyles;

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      height: "50px",
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      padding: "2rem 4rem",
      borderRadius: "5px",
      border: "2px solid white",
      color: theme.palette.primary.dark,
      "&:focus-within": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },

    searchContainer: {
      position: "relative",
      display: "block",
      width: "100%",
    },

    searchIcon: {
      top: "50%",
      left: "20px",
      transform: "translateY(-45%)",
      position: "absolute",
      color: theme.palette.primary.dark,
    },
  })
);

export default useStyles;

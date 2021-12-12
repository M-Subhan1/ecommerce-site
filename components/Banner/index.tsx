import { FC } from "react";
import { Box, Typography } from "@material-ui/core";

import useStyles from "./styles";

const Banner: FC = props => {
  const classes = useStyles();
  const years = new Date().getFullYear() - 2001;
  return (
    <Box className={classes.banner}>
      <Typography
        align='center'
        variant='subtitle2'
      >{`${years} years of Excellence makes Creative Books students' and teachers' # 1 Choice`}</Typography>
    </Box>
  );
};

export default Banner;

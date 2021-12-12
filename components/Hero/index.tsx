import { FC } from "react";
import { Grid, Typography, Box, useMediaQuery } from "@material-ui/core";
import StudentIcon from "../../public/svg/Learning-bro.svg";
import useStyles from "./styles";
import { useRouter } from "next/dist/client/router";

const Hero: FC = props => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item md={6} xs={12} className={classes.headingContainer}>
        <Typography variant='h1' className={classes.heading}>
          Supplement your learning
        </Typography>
        <Typography variant='h2' className={classes.subHeading}>
          We offer a complete range of expertly curated series of helping
          materials to supplement your year long classroom learning and last
          minute exam preparation
        </Typography>
        <Box
          component='span'
          className={classes.button}
          onClick={() => router.push("/store")}
        >
          Vist Our Store
        </Box>
      </Grid>
      <Grid item md={6} xs={12} className={classes.image}>
        <StudentIcon width='600' hieght='600' />
      </Grid>
    </Grid>
  );
};

export default Hero;

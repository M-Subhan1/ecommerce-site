import React, { FC } from "react";
import { Box, Container, Toolbar, AppBar, Grid } from "@material-ui/core";
import useStyles from "./styles";

const Footer: FC = () => {
  const classes = useStyles();
  const year = new Date().getFullYear();

  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar>
        <Container className={classes.container}>
          Logo
          <Box className={classes.footerSection}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box component='span'>
                  Creative Books, 7/8 Makkah Center, Lower Mall,Lahore, Pakistan
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box component='span'>info@creativebooks.pk</Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box component='span'>042 37 22 46 66 /042 37 110 267-70</Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.footerSection}>
            {year} Creative Books. All Rights Reserved
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

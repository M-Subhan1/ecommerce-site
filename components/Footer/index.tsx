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
                  Lorem Ipsum, I-8, Islamabad, Pakistan
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box component='span'>info@dummystores.pk</Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box component='span'>051 27 32 46 56 /051 37 120 237-70</Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.footerSection}>
            {year} Dummy Stores. All Rights Reserved
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

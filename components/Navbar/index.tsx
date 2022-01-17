import React, { FC, ReactElement, useEffect } from "react";
import useStyles from "./styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import HamburgerMenu from "../Hamburger";
import BagIcon from "../../public/svg/shopping-bag.svg";
import MenuIcon from "../../public/svg/menu.svg";
import { useRouter } from "next/dist/client/router";
import { IState } from "../../src/reducers";
import { connect } from "react-redux";
import { sign_in, sign_out } from "../../src/actions";

const links = [
  { label: "Home", url: "/" },
  { label: "Store", url: "/store" },
  { label: "Track Order", url: "/track" },
  { label: "Contact Us", url: "/contact-us" },
  { label: "About Us", url: "/about-us" },
];

interface ElevationScrollProps {
  window?: Function;
}

interface NavBarProps {
  user: any;
  cart: IState["cart"];
  cartURL: string;
  sign_in: (data: any) => void;
  sign_out: () => void;
}

const ElevationScroll: FC<ElevationScrollProps> = props => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children as ReactElement<any, string>, {
    elevation: trigger ? 4 : 0,
  });
};

const NavBar: FC<NavBarProps> = props => {
  const router = useRouter();
  const classes = useStyles();
  const [hamburgerOpen, setIsHamburgerOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (props.user) return;

    const token = localStorage.getItem("token");
    if (token) props.sign_in({ identifier: token });
    setLoading(false);
  }, []);

  useEffect(() => {
    const user: any = props.user;
    if (loading) return;
    if (user && user.account_type == "admin") router.push("/dashboard");
  }, [loading]);

  return (
    <Box>
      <ElevationScroll {...props}>
        <AppBar position='fixed'>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              className={classes.grid}
              justifyContent='space-between'
            >
              <Grid xs={7} item container className={classes.logoContainer}>
                <Grid item md={5} xs={12}>
                  <Box
                    mr={2}
                    textAlign='center'
                    alignContent='center'
                    onClick={() => router.push("/dashboard")}
                  >
                    ABC
                  </Box>
                </Grid>
                <Grid md={6} xs={false} item className={classes.hidden}>
                  {/* <SearchBar /> */}
                </Grid>
              </Grid>

              <Grid md={3} xs={5} item>
                <Box
                  component='span'
                  className={classes.cartIcon}
                  onClick={() => router.push(props.cartURL)}
                >
                  <BagIcon width='25' height='25' />
                  <Box component='span' ml={1} className={classes.cartItems}>
                    {props.cart.length}
                  </Box>
                </Box>
                <Box
                  className={classes.hamburgerIcon}
                  component='span'
                  mx={2}
                  onClick={() => setIsHamburgerOpen(true)}
                >
                  <MenuIcon width={20} height={20} />
                </Box>
                <Box className={classes.hidden}>
                  {!props.user ? (
                    <Button
                      variant='outlined'
                      className={`${classes.btn} ${classes.hidden}`}
                      color='secondary'
                      onClick={() => router.push("/login")}
                    >
                      Sign In
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      className={`${classes.btn} ${classes.hidden}`}
                      color='secondary'
                      onClick={() => props.sign_out()}
                    >
                      Sign Out
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {hamburgerOpen && (
        <HamburgerMenu
          setIsMenuOpen={setIsHamburgerOpen}
          links={links}
          cartURL={props.cartURL}
          cartItems={props.cart.length}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

export default connect(mapStateToProps, { sign_in, sign_out })(NavBar);

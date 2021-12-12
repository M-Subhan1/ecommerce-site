import { FC, useEffect, useState } from "react";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";
import SearchBar from "../Searchbar";
import UserIcon from "../../public/svg/user.svg";
import BagIcon from "../../public/svg/shopping-bag.svg";
import CloseIcon from "../../public/svg/cancel.svg";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

interface HamburgerProps {
  cartURL: string;
  setIsMenuOpen: (state: boolean) => void;
  links: { label: string; url: string }[];
  cartItems: number;
}

const HamburgerMenu: FC<HamburgerProps> = props => {
  const classes = useStyles();
  const router = useRouter();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(router.pathname);
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.hamburgerContainer}>
        <Box className={classes.logo} onClick={() => router.push("/")}>
          ABC
          <CloseIcon
            width={15}
            height={15}
            onClick={() => props.setIsMenuOpen(false)}
          />
        </Box>
        <Box className={classes.hamburgerIcons}>
          <Box component='span'>
            <UserIcon width={25} height={25} />
            <Box component='span' ml={1}>
              Sign In
            </Box>
          </Box>
          <Box component='span'>
            <BagIcon
              width={25}
              height={25}
              onClick={() => router.push(props.cartURL)}
            />
            <Box component='span' ml={1} className={classes.cartItems}>
              {props.cartItems}
            </Box>
          </Box>
        </Box>
        <Box my={4}>
          <SearchBar />
        </Box>
        {props.links.map(link => (
          <Box key={link.label} onClick={() => props.setIsMenuOpen(false)}>
            <Link href={link.url} passHref>
              <Typography
                variant='h4'
                className={`${classes.link} ${
                  pathName === link.url ? classes.selectedLink : ""
                }`}
              >
                {link.label}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HamburgerMenu;

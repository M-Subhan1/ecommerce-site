import { FC } from "react";
import useStyles from "./styles";
import { Box } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import SearchIcon from "../../public/svg/search.svg";

interface SearchBarProps {
  styles?: {
    root: any;
  };
}

const SearchBar: FC<SearchBarProps> = props => {
  const classes = useStyles();
  return (
    <Box className={classes.searchContainer}>
      <Box component='span' className={classes.searchIcon}>
        <SearchIcon width={20} height={20} alt='search-icon' />
      </Box>
      <InputBase
        placeholder='Product Name or ID'
        fullWidth
        className={classes.search}
      />
    </Box>
  );
};

export default SearchBar;

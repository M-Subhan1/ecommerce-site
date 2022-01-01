import { FC } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Image from "next/image";
import PlusIcon from "../../public/svg/plus.svg";
import { CartItem } from "../../src/actions";
import { useRouter } from "next/dist/client/router";

interface CardProps {
  card: {
    item: CartItem;
  };
  addToCart: (item: CartItem) => void;
}

const CustomCard: FC<CardProps> = props => {
  const router = useRouter();
  const classes = useStyles();
  const {
    card: { item },
  } = props;
  return (
    <Card className={classes.root}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          {item.discount > 0 ? (
            <Box component='span' className={classes.discount}>
              -{item.discount}%
            </Box>
          ) : (
            <Box
              component='span'
              className={`${classes.discount} ${classes.new}`}
            >
              New
            </Box>
          )}
        </Grid>
        <Grid item xs={12} className={classes.image}>
          <Image
            className={classes.hover}
            onClick={() => router.push(`/items/${item.product_id}`)}
            width={120}
            height={170}
            src={`${item.image_url}`}
            alt={item.product_name}
          />
        </Grid>
        <Grid item xs={12} className={classes.pricing}>
          <Typography
            variant='subtitle1'
            className={`${classes.title} ${classes.hover}`}
            onClick={() => router.push(`/items/${item.product_id}`)}
          >
            {item.product_name}
          </Typography>
          <Box component='span' className={classes.price}>
            Rs.
            {Math.ceil(item.price * (1 - item.discount / 100))}
          </Box>
          {item.discount > 0 && (
            <Box component='span' className={classes.slashed}>
              {item.price}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} className={classes.plusContainer}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => props.addToCart(item)}
          >
            <PlusIcon width={12} height={12} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CustomCard;

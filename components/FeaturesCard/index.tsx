import { FC } from "react";
import { Typography, Card, Box } from "@material-ui/core";

import useStyles from "./styles";

interface ComponentProps {
  cardTitle: string;
  cardIcon: any;
  cardContent: string;
}

const FeaturesCard: FC<ComponentProps> = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography className={classes.heading}>
        <props.cardIcon width='45' height='45' />
        <Box component='span' className={classes.span}>
          {props.cardTitle}
        </Box>
      </Typography>
      <Typography className={classes.cardContent}>
        {props.cardContent}
      </Typography>
    </Card>
  );
};

export default FeaturesCard;

import { FC } from "react";
import { Box, Typography, Grid, Card, Container } from "@material-ui/core";
import FeaturesCard from "../FeaturesCard";
import ReviseIcon from "../../public/svg/revision.svg";
import StudyIcon from "../../public/svg/book.svg";
import TestIcon from "../../public/svg/test.svg";

import useStyles from "./styles";

const config = [
  {
    icon: StudyIcon,
    content:
      "Textbook Solutions and Guides are engineered to enable readers to develop  comprehensive concepts and provide summarised notes for quick revision",
    title: "Conceptual Study",
  },
  {
    icon: TestIcon,
    content:
      "Our range of Board Question Banks introduce readers to exam board question pattern help readers identify their weaker areas",
    title: "Testing Concepts",
  },
  {
    icon: ReviseIcon,
    content:
      "Our Self-Test and Up-To-Date Papers are designed to train students in time management and sufficient content practice",
    title: "Exam Strategies",
  },
];

const HowToUse: FC = props => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography align='center' variant='h5' className={classes.heading}>
        Quality education made affordable
      </Typography>
      <Typography align='center' className={classes.tagline}>
        {
          "Quality education is everyone's right. True to out mission, we provide inexpensive quality educational material for a holistic education"
        }
      </Typography>
      <Grid container justifyContent='center'>
        {config.map(item => (
          <Grid
            key={item.title}
            item
            md={4}
            sm={9}
            xs={11}
            className={classes.gridItem}
          >
            <FeaturesCard
              cardContent={item.content}
              cardTitle={item.title}
              cardIcon={item.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowToUse;

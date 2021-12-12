import { FC } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import useStyles from "../styles/about-us";

const AboutUs: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box component='span' className={classes.heading}>
          <Typography variant='h5' component='h1'>
            About Us
          </Typography>
        </Box>
      </Container>
      <Container>
        <Typography variant='body1' className={classes.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          corporis recusandae eum, natus praesentium odio sed laudantium itaque,
          animi modi exercitationem aspernatur quasi et, expedita accusamus
          consequatur ipsam magni! Debitis eos necessitatibus ipsam provident
          sunt praesentium id perspiciatis amet ex quaerat voluptatem, quasi sed
          commodi officia. Provident nostrum, voluptate ex earum vitae laborum
          commodi assumenda modi obcaecati, molestiae quo optio, deserunt nemo
          dolorem autem excepturi sed fugiat? Accusamus veritatis iste quaerat
          maxime odio blanditiis esse qui consequuntur in hic, maiores eum,
          quasi cum officiis sed quos soluta velit! Beatae, aspernatur velit
          molestiae, praesentium eius nam commodi, cumque dolor eligendi neque
          voluptatum ipsum voluptatem nulla non veritatis culpa accusamus earum
          eos in sit quidem recusandae dicta harum quis. Quibusdam dolorem
          cupiditate accusamus deserunt tempore, at alias perferendis, labore
          aperiam nam dolorum quos? Dolorum iure debitis exercitationem quod
          vero quae ipsum numquam! Temporibus earum facilis suscipit, fugit
          rerum eius laborum molestiae fugiat repellat, modi consequatur commodi
          laboriosam ullam esse accusamus, sit quasi obcaecati optio beatae.
          Voluptatem eos quis porro et illum nesciunt cupiditate accusantium!
          Sit praesentium molestiae veritatis tempore reprehenderit! Debitis
          enim officia architecto veritatis nemo. Debitis eius corporis neque
          magni commodi amet cumque, unde, deleniti harum ipsa consectetur
          labore quaerat? Assumenda molestias atque sunt quod in nesciunt
          dolorem tempore amet iusto consequatur voluptatibus aspernatur
          facilis, ipsam magnam aperiam dicta, sit eum beatae at officia
          voluptate explicabo hic harum! Natus doloremque id error ipsam. Sequi
          itaque temporibus, consequatur voluptatibus dignissimos iste id veniam
          voluptas cupiditate dolore repellendus tempore quam ipsa quas magnam.
          Earum, suscipit dolorum, autem dignissimos deserunt eum, itaque eaque
          quibusdam quasi amet neque quod perferendis saepe recusandae placeat
          accusamus obcaecati praesentium pariatur asperiores? Consequatur quae
          natus ea, minima, similique ipsum fugiat provident nihil molestias
          quasi, eum aperiam corrupti dolor perspiciatis qui harum? Optio quod
          repudiandae dolores iste voluptatem veritatis corporis?
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutUs;

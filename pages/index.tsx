import React from "react";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import HowToUse from "../components/HowToUse";
import FeaturedProducts from "../components/FeaturedProducts";
import _ from "lodash";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { CartItem } from "../src/actions";

interface PageProps {
  featuredBooks: CartItem[];
}

const Home: NextPage<PageProps> = props => {
  return (
    <React.Fragment>
      <Hero />
      <Banner />
      <HowToUse />
      <FeaturedProducts featuredBooks={props.featuredBooks} />
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        products(where: { featured: true }) {
          id
          title
          medium
          class
          stock
          image {
            url
          }
          category {
            type
            description
          }
          price
          discount
        }
      }
    `,
  });

  return {
    props: {
      featuredBooks: data.products,
    },
  };
};

export default Home;

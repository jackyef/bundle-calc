import React, { useContext } from 'react';
import { Heading, Spinner, IconButton, useColorMode } from '@chakra-ui/core';
import Head from 'next/head';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import TotalStats from '../components/TotalStats';
import SelectedPackages from '../components/SelectedPackages';
import Footer from '../components/Footer';
import { PackageSumContext } from '../components/Layout/PackageSumProvider';

const Header = () => {
  const { loading } = useContext(PackageSumContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Heading as="h1" mb={8} display="flex" justifyContent="space-between">
      <div>
        <code>bundle-calc</code> {loading ? <Spinner /> : null}
      </div>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? 'moon' : 'sun'}
      />
    </Heading>
  );
};

const index = () => {
  return (
    <Layout>
      <Head>
        <title>
          bundle-calc | calculate bundle size of your next project! 💻
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Helps you decide on the stack for your next project by calculating the estimated bundle size."
        />
        {/* <link
          rel="canonical"
          href="https://bundlephobia.com"
        /> */}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?l=4"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?l=3"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        /> */}
        <meta
          name="apple-mobile-web-app-title"
          content="bundle-calc"
        />
        <meta
          name="application-name"
          content="bundle-calc"
        /> 
        <meta
          property="og:description"
          content="Helps you decide on the stack for your next project by calculating the estimated bundle size."
        />
        {/* <meta
          property="og:url"
          content="https://bundlephobia.com"
        /> */}
        <meta
          property="twitter:creator"
          content="@jackyef__"
        />
      </Head>
      <Header />
      <TotalStats />
      <SearchInput />
      <SelectedPackages />
      <Footer />
    </Layout>
  );
};

export default index;

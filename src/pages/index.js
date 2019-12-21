import React, { useContext, useEffect } from 'react';
import { Heading, Spinner, IconButton, useColorMode } from '@chakra-ui/core';
import Head from 'next/head';
import { register } from 'next-offline/runtime'

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import TotalStats from '../components/TotalStats';
import SelectedPackages from '../components/SelectedPackages';
import Footer from '../components/Footer';
import { PackageSumContext } from '../components/Layout/PackageSumProvider';
import { initGA } from '../utils/GA';
import { registerSW } from '../utils/serviceWorker';
import canUseDOM from '../utils/dom/canUseDOM';

if (canUseDOM) {
  register();
}

const Header = () => {
  const { loading } = useContext(PackageSumContext);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    initGA();
  }, []);

  return (
    <Heading as="h1" mb={8} display="flex" justifyContent="space-between">
      <div>
        <code>bundle-calc</code> {loading ? <Spinner /> : null}
      </div>
      <IconButton
        aria-label="Toggle dark mode"
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1A202C" />
        <link rel="canonical" href="https://bundle-calc.now.sh" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="bundle-calc" />
        <meta name="application-name" content="bundle-calc" />
        <meta
          property="og:description"
          content="Helps you decide on the stack for your next project by calculating the estimated bundle size."
        />
        <meta property="og:url" content="https://bundle-calc.now.sh" />
        <meta property="twitter:creator" content="@jackyef__" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-149852843-2"
        ></script>
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

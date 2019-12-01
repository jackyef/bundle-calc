import React, { useContext } from 'react';
import { Heading, Spinner } from '@chakra-ui/core';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import TotalStats from '../components/TotalStats';
import SelectedPackages from '../components/SelectedPackages';
import { PackageSumContext } from '../components/Layout/PackageSumProvider';

// TODO: create a drawer to see list of dependencies
const Header = () => {
  const { loading } = useContext(PackageSumContext);

  return (
    <Heading as="h1" mb={8}>
      <code>bundle-calc</code> {loading ? <Spinner /> : null}
    </Heading>
  );
};

const Index = () => {
  return (
    <Layout>
      <Header />
      <TotalStats />
      <SearchInput />
      <SelectedPackages />
    </Layout>
  );
};

export default Index;

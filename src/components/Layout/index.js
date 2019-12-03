import React from 'react';
import { createDataClient, DataProvider } from 'react-isomorphic-data';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import PackageSumProvider from './PackageSumProvider';

const client = createDataClient();

const Layout = props => {
  return (
    <DataProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <PackageSumProvider>
          <Box as="main" width="100%" margin="auto" maxWidth={['100%', '100%', '64vw']} padding={['4rem 1rem', '4rem 2rem']}>
            {props.children}
          </Box>
        </PackageSumProvider>
      </ThemeProvider>
    </DataProvider>
  );
};

export default Layout;

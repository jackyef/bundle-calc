import React from 'react';
import { createDataClient, DataProvider } from 'react-isomorphic-data';
import {
  ThemeProvider,
  CSSReset,
  Box,
  ColorModeProvider,
} from '@chakra-ui/core';

import PackageSumProvider from './PackageSumProvider';

const client = createDataClient();

const Layout = props => {
  return (
    <DataProvider client={client}>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <PackageSumProvider>
            <Box
              as="main"
              width="100%"
              margin="auto"
              maxWidth={['100%', '100%', '64vw']}
              padding={['4rem 1rem', '4rem 2rem']}
            >
              {props.children}
            </Box>
          </PackageSumProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </DataProvider>
  );
};

export default Layout;

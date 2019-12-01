import React from 'react';
import { createDataClient, DataProvider } from 'react-isomorphic-data';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import PackageSumProvider from './PackageSumProvider';
// import '../../style.css';

const client = createDataClient();

const Layout = props => {
  return (
    <DataProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <PackageSumProvider>
          <Box as="main" width="100%" margin="auto" maxWidth={['100%', '100%', '64vw']} padding={['4rem 1rem', '4rem 2rem']}>
            {/* <div className="flex flex-col min-h-screen"> */}
              {/* <main className="flex-1 max-w-4xl mx-auto p-4 md:px-8 md:py-16 w-full"> */}
                {props.children}
              {/* </main>
            </div> */}
          </Box>
        </PackageSumProvider>
      </ThemeProvider>
    </DataProvider>
  );
};

export default Layout;

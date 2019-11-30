import React from 'react';
import { createDataClient, DataProvider } from 'react-isomorphic-data';

import '../../style.css';

const client = createDataClient();

const Layout = (props) => {
  return (
    <DataProvider client={client}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 max-w-4xl mx-auto p-4 md:px-8 md:py-16 w-full">
          {props.children}
        </main>
      </div>
    </DataProvider>
  );
}

export default Layout;

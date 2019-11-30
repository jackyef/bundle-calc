import React from 'react';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';

const Index = () => (
  <Layout>
    <div>
      <p>Hello Next.js</p>
      <div className="column">
        <SearchInput />
        <div>Result here...</div>
      </div>
    </div>
  </Layout>
);

export default Index;

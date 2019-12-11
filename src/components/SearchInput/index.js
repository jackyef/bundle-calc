import React, { useState, useContext } from 'react';
import { useData, createDataClient, DataProvider } from 'react-isomorphic-data';
import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
} from '@chakra-ui/core';

import { PackageSumContext } from '../Layout/PackageSumProvider';
import SearchResults from './SearchResults';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const { data, error, loading, refetch } = useData(
    'https://api.npms.io/v2/search/suggestions',
    {
      q: searchText,
      size: 10,
    },
    undefined,
    {
      skip: !searchText,
    },
  );

  const packageSum = useContext(PackageSumContext);

  return (
    <div>
      <InputGroup>
        <Input
          type="text"
          onChange={e => setSearchText(e.target.value)}
          aria-label="Search for packages on npm"
          placeholder="Search for packages on npm..."
        />
        <InputRightElement>{loading ? <Spinner /> : null}</InputRightElement>
      </InputGroup>
      <SearchResults
        data={data}
        loading={loading}
        error={error}
        searchText={searchText}
        packages={packageSum.packages}
        onAdd={packageSum.add}
      />
    </div>
  );
};

export default React.memo(SearchInput);

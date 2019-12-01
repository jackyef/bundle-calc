import React, { useState, useContext } from 'react';
import { useData, createDataClient, DataProvider } from 'react-isomorphic-data';
import {
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
  Button,
  ButtonGroup,
} from '@chakra-ui/core';

import { PackageSumContext } from '../Layout/PackageSumProvider';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const { data, error, loading } = useData(
    'https://api.npms.io/v2/search/suggestions',
    {
      q: searchText,
      size: 10,
    },
  );

  const packageSum = useContext(PackageSumContext);

  let content = null;

  if (!data && loading) {
    content = null;
  } else if (Array.isArray(data)) {
    content = data.map(d => {
      const packageAndVersion = `${d.package.name}@${d.package.version}`;

      const onClick = () => {
        packageSum.add({ name: d.package.name, version: d.package.version });
      };

      return (
        <ButtonGroup spacing={4} marginRight={2} marginBottom={2} key={packageAndVersion}>
          <Button leftIcon="add" size="sm" onClick={onClick}>
            {packageAndVersion}
          </Button>
        </ButtonGroup>
      );
    });
  } else if (searchText) {
    content = <div>No result.</div>;
  } else {
    content = null;
  }

  return (
    <div>
      <InputGroup>
        <Input type="text" onChange={e => setSearchText(e.target.value)} />
        <InputRightElement>
          {loading ? <Spinner color="purple.500" /> : null}
        </InputRightElement>
      </InputGroup>
      <Collapse mt={4} isOpen={Boolean(content)}>
        {content}
      </Collapse>
    </div>
  );
};

export default SearchInput;

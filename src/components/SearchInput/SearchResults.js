import React from 'react';
import {
  Collapse,
  IconButton,
  Spinner,
  Button,
  ButtonGroup,
} from '@chakra-ui/core';

const SearchResults = ({ data, loading, error, searchText, packages, onAdd }) => {
  let content = null;

  if (!data && loading) {
    content = null;
  } else if (Array.isArray(data)) {
    content = data.map(d => {
      const packageAndVersion = `${d.package.name}@${d.package.version}`;
      const alreadyAdded = packages.some(p => p[0] === packageAndVersion);

      return (
        <SearchResultItem
          packageName={d.package.name}
          packageVersion={d.package.version}
          key={packageAndVersion}
          onClick={onAdd}
          disabled={alreadyAdded}
          packageAndVersion={packageAndVersion}
        />
    });
  } else if (error) {
    content = (
      <div>
        Please check your internet connection.{' '}
        {loading ? (
          <Spinner />
        ) : (
          <IconButton
            icon="repeat"
            variant="ghost"
            onClick={refetch}
            aria-label="retry search"
          />
        )}
      </div>
    );
  } else if (searchText) {
    content = (
      <div>
        No result for <code>&quot;{searchText}&quot;</code>
      </div>
    );
  } else {
    content = null;
  }

  return (
    <Collapse mt={4} isOpen={Boolean(content)}>
      {content}
    </Collapse>
  );
};

const MemoizedSearchResults = React.memo(SearchResults);

export default MemoizedSearchResults;

import React, { useState } from 'react';
import { useData, createDataClient, DataProvider } from 'react-isomorphic-data';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const { data, error, loading } = useData(
    'https://api.npms.io/v2/search/suggestions',
    {
      q: searchText,
    },
  );

  let content = null;

  if (!data && loading) {
    content = <div>Loading...</div>;
  } else if (Array.isArray(data)) {
    content = data.map(d => {
      const packageAndVersion = `${d.package.name}@${d.package.version}`;

      return (
        <div key={packageAndVersion}>
          {packageAndVersion}
          <style jsx>{`
            div {
              padding: 4px 8px;
              border-radius: 4px;
              border: 1px solid gray;
              margin-bottom: 8px;
              color: white;
              background: #333;
            }

            div:hover {
              filter: brightness(120%);
            }
          `}</style>
        </div>
      );
    });
  } else {
    content = <div className="package">No result.</div>;
  }

  return (
    <div>
      <input
        type="text"
        onChange={e => setSearchText(e.target.value)}
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      />
      {content}
    </div>
  );
};

export default SearchInput;

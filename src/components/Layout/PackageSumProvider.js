import React, { useMemo, useEffect, useState, createContext } from 'react';
import { useData } from 'react-isomorphic-data';
import { useToast, useDisclosure } from '@chakra-ui/core';

export const PackageSumContext = React.createContext({
  packages: {},
});

const bundlephobiaAPI = `https://bundlephobia.com/api/size?package=@apollo/react-hooks&record=true`;

const PackageSumProvider = ({ children }) => {
  const toast = useToast();
  const [state, setState] = useState({
    packages: {},
  });
  const drawerDisclosure = useDisclosure();
  const [lastSelected, setLastSelected] = useState('');
  const fullPkgName = `${lastSelected.name}@${lastSelected.version}`;
  const { data, error, loading } = useData(
    'https://bundlephobia.com/api/size',
    {
      package: fullPkgName,
      record: true,
    },
    undefined,
    {
      skip: !lastSelected.name,
    },
  );

  useEffect(() => {
    if (data && lastSelected) {
      setState(prev => ({
        ...prev,
        packages: {
          ...prev.packages,
          [fullPkgName]: data,
        },
      }));

      toast({
        title: `Successfully added ${fullPkgName}.`,
        description: `Total size has been updated.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }

    if (error) {
      toast({
        title: `Failed to add ${fullPkgName}.`,
        description: `The size of the package is not available.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data, error, lastSelected]); // eslint-disable-line

  const add = pkg => {
    setLastSelected(pkg);
  };

  const remove = pkgFullName => {
    setState(prev => {
      const fullName = pkgFullName;
      const newState = {
        ...prev,
        packages: {
          ...prev.packages,
        },
      };

      delete newState.packages[fullName];

      return newState;
    });
  };

  const packages = useMemo(
    () =>
      Object.keys(state.packages).map(key => {
        return [key, state.packages[key]];
      }),
    [state.packages],
  );

  const totalSize = useMemo(() => {
    return packages.reduce((acc, v) => acc + v[1].gzip, 0);
  }, [packages]);

  const apis = {
    packages,
    totalSize,
    add,
    remove,
    drawerDisclosure,
    loading,
  };

  return (
    <PackageSumContext.Provider value={apis}>
      {children}
    </PackageSumContext.Provider>
  );
};

export default PackageSumProvider;

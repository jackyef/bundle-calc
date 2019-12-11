import React, { useMemo, useEffect, useState, createContext, useCallback } from 'react';
import { useLazyData } from 'react-isomorphic-data';
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
  const [inflightRequests, setInflightRequests] = useState({});
  const drawerDisclosure = useDisclosure();

  const add = useCallback(async pkg => {
    const fullPkgName = `${pkg.name}@${pkg.version}`;

    try {
      setInflightRequests(prev => {
        return {
          ...prev,
          [fullPkgName]: true,
        };
      });
      const loadedData = await(await fetch(`https://bundlephobia.com/api/size?package=${fullPkgName}&record=true`)).json();
      
      setState(prev => ({
        ...prev,
        packages: {
          ...prev.packages,
          [fullPkgName]: loadedData,
        },
      }));

      setInflightRequests(prev => {
        const newState = { ...prev };
        
        delete newState[fullPkgName];

        return newState;
      });

      toast({
        title: `Successfully added ${fullPkgName}.`,
        description: `Total size has been updated.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Failed to add ${fullPkgName}.`,
        description: `The size of the package is not available.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      setInflightRequests(prev => {
        const newState = { ...prev };
        
        delete newState[fullPkgName];

        return newState;
      });
    }
  }, [toast]);

  const remove = useCallback(pkgFullName => {
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
  }, []);

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
    loading: Object.keys(inflightRequests).length > 0,
  };

  return (
    <PackageSumContext.Provider value={apis}>
      {children}
    </PackageSumContext.Provider>
  );
};

export default PackageSumProvider;

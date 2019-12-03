import React, { useState, useContext, useMemo } from 'react';
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
  Spinner,
} from '@chakra-ui/core';

import { PackageSumContext } from '../Layout/PackageSumProvider';

const TotalStats = () => {
  const { totalSize, drawerDisclosure, packages } = useContext(PackageSumContext);
  const prettifiedSize = useMemo(() => {
    return `${totalSize / 1024}`.split('.').map((v, i) => i === 0 ? v : v.substring(0, 2)).join('.');
  }, [totalSize]);

  return (
    <Stat
      as={Flex}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      role="button"
      onClick={drawerDisclosure.onOpen}
    >
      <StatLabel fontSize="lg" as={Flex} alignItems="center">
        Total ({packages.length}) <IconButton icon="edit" variant="ghost" size="sm" />
      </StatLabel>
      <StatNumber fontSize="5xl">{prettifiedSize} kB</StatNumber>
    </Stat>
  );
};

export default TotalStats;

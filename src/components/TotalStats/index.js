import React, { useState, useContext } from 'react';
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
  const { totalSize, drawerDisclosure } = useContext(PackageSumContext);

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
        Total <IconButton icon="edit" variant="ghost" size="sm" /> 
      </StatLabel>
      <StatNumber fontSize="5xl">{totalSize / 1024} kB</StatNumber>
    </Stat>
  );
};

export default TotalStats;

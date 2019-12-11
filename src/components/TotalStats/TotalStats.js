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

const TotalStats = ({ prettifiedSize, packagesCount, onOpen }) => {
  return (
    <Stat
      as={Flex}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      role="button"
      onClick={onOpen}
    >
      <StatLabel fontSize="lg" as={Flex} alignItems="center">
        Total ({packagesCount}){' '}
        <IconButton
          icon="edit"
          variant="ghost"
          size="sm"
          aria-label="See details"
        />
      </StatLabel>
      <StatNumber fontSize="5xl">{prettifiedSize} kB</StatNumber>
    </Stat>
  );
};

const MemoizedTotalStats = React.memo(TotalStats);

export default MemoizedTotalStats;

import React, { useState, useContext, useMemo } from 'react';
import {
  Text,
  Link,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
} from '@chakra-ui/core';

import { PackageSumContext } from '../Layout/PackageSumProvider';

const TotalStats = () => {
  return (
    <Flex
      as="footer"
      direction="column"
      alignItems="center"
      justifyContent="center"
      fontSize={14}
      position="fixed"
      padding={4}
      bottom={4}
      left={0}
      right={0}
      display={['none', 'flex']}
    >
      <Text>
        Created by{' '}
        <Link href="https://twitter.com/@jackyef__" isExternal>
          @jackyef__
        </Link>{' '}
      </Text>
      <Text>
        Powered by{' '}
        <Link href="https://npms.io" isExternal>
          <strong>
            <em>npms.io</em>
          </strong>
          <Icon name="external-link" mx="2px" />
        </Link>{' '}
        and{' '}
        <Link href="https://bundlephobia.com" isExternal>
          <strong>
            <em>bundlephobia</em>
          </strong>
          <Icon name="external-link" mx="2px" />
        </Link>
      </Text>
    </Flex>
  );
};

export default TotalStats;

import React, { useState, useContext, useMemo } from 'react';

import TotalStats from './TotalStats';
import { PackageSumContext } from '../Layout/PackageSumProvider';

const Wrapper = () => {
  const { totalSize, drawerDisclosure, packages } = useContext(
    PackageSumContext,
  );
  const prettifiedSize = useMemo(() => {
    return `${totalSize / 1024}`
      .split('.')
      .map((v, i) => (i === 0 ? v : v.substring(0, 2)))
      .join('.');
  }, [totalSize]);

  return (
    <TotalStats
      prettifiedSize={prettifiedSize}
      packagesCount={packages.length}
      onOpen={drawerDisclosure.onOpen}
    />
  );
};

export default Wrapper;

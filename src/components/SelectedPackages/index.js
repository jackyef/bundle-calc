import React, { useContext, useState, useEffect } from 'react';
import { PackageSumContext } from '../Layout/PackageSumProvider';
import {
  useDisclosure,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/core';

const SelectedPackages = () => {
  const { drawerDisclosure } = useContext(PackageSumContext);
  const { isOpen, onClose } = drawerDisclosure;
  const [placement, setPlacement] = useState('right');
  const packageSum = useContext(PackageSumContext);
  const { packages, totalSize } = packageSum;

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth <= 480) setPlacement('bottom');
    }

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    }
  }, []);

  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Packages List</DrawerHeader>
        <DrawerBody>
          {packages.map(([k, v]) => {
            const removePackage = () => {
              packageSum.remove(k);
            };

            const prettifiedSize = `${v.gzip / 1024}`.split('.').map((s, i) => i === 0 ? s : s.substring(0, 2)).join('.');

            return (
              <div
                key={k}
                onClose={removePackage}
              >
                {k} - {prettifiedSize} kB
              </div>
            );
          })}
        </DrawerBody>
        <DrawerFooter>
          Total: {`${String(totalSize / 1024).substring(0, 7)} kB`}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectedPackages;

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

  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Packages List</DrawerHeader>
        <DrawerBody>
          {packages.map(([k, v]) => {
            const removePackage = () => {
              packageSum.remove(k);
            };

            return (
              <div
                key={k}
                label={`${String(v.gzip / 1024).substring(0, 7)} kB`}
                onClose={removePackage}
              >
                {k}
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

import React, { useContext, useState, useEffect } from 'react';
import { PackageSumContext } from '../Layout/PackageSumProvider';
import {
  useDisclosure,
  Flex,
  Button,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Text,
} from '@chakra-ui/core';

const canUseDOM = typeof window !== 'undefined';

const SelectedPackages = () => {
  const { drawerDisclosure } = useContext(PackageSumContext);
  const { isOpen, onClose } = drawerDisclosure;
  const [placement, setPlacement] = useState(canUseDOM && window.innerWidth <= 480 ? 'bottom' : 'right');
  const packageSum = useContext(PackageSumContext);
  const { packages, totalSize } = packageSum;

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth <= 480) {
        if (placement !== 'bottom') setPlacement('bottom');
      } else if (placement !== 'right') {
        setPlacement('right');
      } 
    }

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [placement]);

  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Packages List</DrawerHeader>
        <DrawerBody maxHeight="84vw" overflow="scroll">
          {packages.map(([k, v]) => {
            const removePackage = () => {
              packageSum.remove(k);
            };

            const prettifiedSize = `${v.gzip / 1024}`.split('.').map((s, i) => i === 0 ? s : s.substring(0, 2)).join('.');

            return (
              <Flex
                key={k}
                justifyContent="space-between"
                marginBottom={2}
              >
                <Button leftIcon="small-close" size="sm" variant="outline" onClick={removePackage}>
                  {k}
                </Button>
                <Text>
                  <strong>{prettifiedSize} kB</strong>
                </Text>
              </Flex>
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

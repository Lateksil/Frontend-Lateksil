import {
  AspectRatio,
  Box,
  Card,
  Flex,
  LinkBox,
  Image,
  VStack,
  Text,
  Badge,
  useDisclosure,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import formatCurrency from '../../../utils/formatCurrently';
import ModalDetailPengujian from '../../modals/ModalDetailPengujian';

const MainCardPengujianBase = ({ pengujian, isLoading, ...props }) => {
  const {
    isOpen: isOpenCardDetail,
    onOpen: onOpenCardDetail,
    onClose: onCloseCardDetail,
  } = useDisclosure();

  if (isLoading)
    return (
      <Card bg="white" shadow="md" {...props}>
        <Skeleton h="40" />
        <VStack py="2" px="4" align="stretch">
          <SkeletonText />
          <Skeleton w="25%" h="2" />
          <Skeleton w="40%" h="2" />
        </VStack>
      </Card>
    );

  return (
    <>
      <Card
        h="full"
        bg="white"
        shadow="sm"
        onClick={onOpenCardDetail}
        _hover={{ shadow: 'md', cursor: 'pointer' }}
        {...props}
      >
        <Flex as={LinkBox} h="full" direction="column">
          <Box>
            <AspectRatio ratio={16 / 9}>
              <React.Fragment>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTirUtBKwU5eyV3AEKpHRtlzwF2zJm2sarGSg&usqp=CAU"
                  alt=""
                  objectFit="cover"
                />
                <Box
                  bg="rgba(0, 0, 0, 0.15)"
                  color="white"
                  position="relative"
                  left={2}
                  bottom={2}
                  px="1"
                >
                  <Box
                    bg="rgba(0, 0, 0, 0.55)"
                    rounded="md"
                    position="absolute"
                    left={2}
                    bottom={2}
                    px="1"
                  >
                    <Text>{pengujian.code}</Text>
                  </Box>
                </Box>
              </React.Fragment>
            </AspectRatio>
          </Box>
          <VStack py="2" px="4" align="stretch" flexGrow={1}>
            <VStack align="stretch" flexGrow={1}>
              <Text fontWeight="semibold">{pengujian.jenis_pengujian}</Text>
            </VStack>
            <Box>
              <Badge colorScheme="green">Laboratorium</Badge>
            </Box>
            <Flex justify="space-between">
              <Text fontWeight="bold" color="blue.700" textAlign="left">
                Rp {formatCurrency(pengujian.price)}
              </Text>
              <Text>Per {pengujian.min_quantity} {pengujian.sampler}</Text>
            </Flex>
          </VStack>
        </Flex>
      </Card>
      <ModalDetailPengujian
        pengujian={pengujian}
        isOpen={isOpenCardDetail}
        onClose={onCloseCardDetail}
      />
    </>
  );
};

export default MainCardPengujianBase;

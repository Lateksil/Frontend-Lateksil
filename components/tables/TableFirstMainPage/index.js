import React from 'react';
import { Flex, GridItem, Image, Text, useDisclosure } from '@chakra-ui/react';
import ModalDetailPengujian from '../../modals/ModalDetailPengujian';
import formatCurrency from '../../../utils/formatCurrently';

const TableFirstMainPage = ({ pengujian, odds }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const oddsColor = odds
    ?.filter((data) => data?.id === pengujian?.id)
    .map(() => '#FBFBFB');

  return (
    <Flex
      borderWidth={2}
      _hover={{ shadow: 'xl' }}
      transitionDuration="300ms"
      w="full"
      bg={oddsColor?.[0] ? oddsColor?.[0] : '#F0F7FF'}
      rounded="lg"
      p="2"
    >
      <Flex w="full" cursor="pointer" onClick={onOpenDetailPengujian}>
        <GridItem textAlign="center" alignSelf="center" w="55%">
          <Flex h="full" justifyContent="space-between">
            <Image
              boxSize="90px"
              src={
                pengujian.image
                  ? `http://localhost:3030/uploads/${pengujian.image}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaf-A9g3WCySkL8QBaTArVm5ELMy8NkXmb3tAmG0&s'
              }
              alt=""
              objectFit="cover"
              rounded="md"
            />
            <Flex w="full" flexDir="column" textAlign="start" px="2">
              <Text fontSize="md" fontWeight="medium">
                {pengujian.jenis_pengujian}
              </Text>
              <Text fontSize="md" color="orange.600">
                {pengujian.code}
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem textAlign="center" alignSelf="center" w="25%">
          <Flex h="full" direction="column" justifyContent="center">
            <Text fontSize="small">{pengujian.min_quantity}</Text>
          </Flex>
        </GridItem>
        <GridItem textAlign="center" alignSelf="center" w="25%">
          <Flex h="full" direction="column" justifyContent="center">
            <Text fontSize="small">Harga Per {pengujian.sampler}</Text>
          </Flex>
        </GridItem>
        <GridItem textAlign="center" alignSelf="center" w="25%">
          <Flex h="full" direction="column" justifyContent="center">
            <Text fontWeight="semibold" fontSize="md" color="blue.700">
              Rp{formatCurrency(pengujian.price)}
            </Text>
          </Flex>
        </GridItem>

        <ModalDetailPengujian
          pengujian={pengujian}
          isOpen={isOpenDetailPengujian}
          onClose={onCloseDetailPengujian}
        />
      </Flex>
    </Flex>
  );
};

export default TableFirstMainPage;

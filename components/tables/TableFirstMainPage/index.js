import React from "react";
import {
  AspectRatio,
  Flex,
  GridItem,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ModalDetailPengujian from "../../modals/ModalDetailPengujian";
import formatCurrency from "../../../utils/formatCurrently";

const TableFirstMainPage = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  return (
    <Flex borderWidth={2} _hover={{ shadow: "xl" }} w="full" rounded="lg" p="2">
      <Flex w="full" cursor="pointer" onClick={onOpenDetailPengujian}>
        <GridItem textAlign="center" alignSelf="center" w="55%">
          <Flex h="full" justifyContent="space-between">
            <Image
              boxSize="90px"
              src={`http://localhost:3030/uploads/${pengujian.image}`}
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

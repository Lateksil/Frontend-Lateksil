import React from "react";
import {
  AspectRatio,
  Flex,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalDetailPengujian from "../../modals/ModalDetailPengujian";

const TableFirstMainPage = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  return (
    <Flex w="full"  cursor="pointer" onClick={onOpenDetailPengujian}>
      <GridItem textAlign="center" alignSelf="center" w="25%" >
        <Flex h="full" justifyContent="center">
          <AspectRatio w="80px" ratio={1}>
            <Image
              src="http://localhost:3030/uploads/1680684311677.jpeg"
              alt=""
              objectFit="cover"
            />
          </AspectRatio>
          <Flex justify="center" align="center">
            <Text px="2" fontSize="small">
              {pengujian.jenis_pengujian}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" w="25%">
        <Flex h="full" direction="column" justifyContent="center">
          <Text fontSize="small">{pengujian.kuantitas}</Text>
        </Flex>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" w="25%">
        <Flex h="full" direction="column" justifyContent="center">
          <Text fontWeight="semibold" fontSize="small">
            {pengujian.harga}
          </Text>
        </Flex>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" w="25%">
        <Flex h="full" direction="column" justifyContent="center">
          <Text fontSize="small">Harga Paket</Text>
        </Flex>
      </GridItem>
      <ModalDetailPengujian
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </Flex>
  );
};

export default TableFirstMainPage;

import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import formatCurrency from "../../../utils/formatCurrently";

const InputQuantitas = ({ cart }) => {
  const totalPricePengujian = parseInt(cart.quantity) * cart.Pengujian.price;

  return (
    <>
      <Flex w="25%" align="center" justifyContent="center">
        <Text ml="2">{cart.quantity}</Text>
        <Text ml="2">{cart.Pengujian.sampler}</Text>
      </Flex>
      <Flex w="20%" align="center" justifyContent="center">
        <Text textAlign="center" color="blue.700" fontWeight="semibold">
          Rp{formatCurrency(totalPricePengujian)}
        </Text>
      </Flex>
    </>
  );
};

export default InputQuantitas;

import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import formatCurrency from "../../../utils/formatCurrently";
import useCartStore from "../../../store/useCartStore";

const InputQuantitas = ({ cart, total }) => {
  const [value, setValue] = useState(parseInt(cart.quantity));
  const [isDescrement, setIsDescrement] = useState(false);

  const [totalPrice, updateTotalPrice] = useCartStore((state) => [
    state.totalPrice,
    state.updateTotalPrice,
  ]);

  useEffect(() => {
    updateTotalPrice(totalPricePengujian);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const totalPricePengujian = value * cart.Pengujian.price;

  function handleIncrement() {
    setValue((prevState) => prevState + 1);
    if (value < 1) {
      setValue(1);
    }
  }

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
  }

  useEffect(() => {
    if (1 === value) {
      setIsDescrement(true);
    } else {
      setIsDescrement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Flex w="25%" align="center" justifyContent="center">
        <InputGroup width="150px">
          <InputLeftElement>
            <Button
              size="sm"
              isDisabled={isDescrement}
              onClick={handleDecrement}
            >
              -
            </Button>
          </InputLeftElement>
          <Input
            type="number"
            textAlign="center"
            max={999}
            min={1}
            defaultValue={parseInt(cart.quantity)}
            value={value}
            onChange={(e) => {
              let newValue = parseInt(e.target.value);
              if (newValue < 1) {
                newValue = 1;
              } else if (newValue > 999) {
                newValue = 999;
              }
              setValue(newValue);
            }}
          />
          <InputRightElement>
            <Button size="sm" onClick={handleIncrement}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
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

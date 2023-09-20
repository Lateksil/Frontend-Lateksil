import React from 'react';
import NextImage from '../../core/nextimage';
import LateksilImage from '../../../assets/images/civil-engginering.jpg';
import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

const AuthenticationLayout = ({ children }) => {
  return (
    <Stack minH="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex
        flex={1}
        align="center"
        shadow="xl"
        p="5"
        direction="column"
        justifyContent="center"
      >
        <Heading
          fontWeight="bold"
          size={{ base: 'md', md: 'md' }}
          color="blue.700"
        >
          LABORATORIUM PENGUJIAN TEKNIK SIPIL
        </Heading>
        <Text fontWeight="semibold">Universitas Bandar Lampung</Text>
        <Box h="max">
          <Link href="/">
            <NextImage
              src={LateksilImage}
              alt="Civil Engginering Illustration"
              layout="responsive"
              placeholder="blur"
            />
          </Link>
        </Box>
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center" flexDir="column">
        {children}
      </Flex>
    </Stack>
  );
};

export default AuthenticationLayout;

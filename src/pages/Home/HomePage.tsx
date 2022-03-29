import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';

function HomePage() {
  return (
    <Flex className="HomePage" direction="column">
      <Button colorScheme="blue" width="200px">
        <Text fontSize="lg">Get current location</Text>
      </Button>
    </Flex>
  );
}

export default HomePage;

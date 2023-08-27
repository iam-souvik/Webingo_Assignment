
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Spacer , Heading, Text, Button,Center,VStack} from '@chakra-ui/react';

// const navigate = useNavigate()


// const handleClick = () => {
//   navigate('/register');
// }


function Home() {
  return (
    <>

      


      <Box p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Welcome to User Management Site
        </Heading>
        <Text fontSize="xl" mb={6}>
          Manage your users with ease using our platform.
        </Text>
        {/* <Button colorScheme="blue" size="lg"  > 
          Get Started
        </Button> */}
        <Link to="/register"><Button colorScheme='blue' > Get Started</Button></Link>
      </Box>

      <Box mt={16}>
        <Center>
          <VStack spacing={8}>
            <Heading as="h2" size="xl">
              Features
            </Heading>
            <Spacer/>
            <Flex align="center" justify="space-between" gap={6}>
              <Box>
                <Text fontSize="lg" fontWeight={"bold"} marginTop={"25px"}>User Registration</Text>
                <Text>Effortlessly onboard new users.</Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight={"bold"} marginTop={"25px"}>Role Management</Text>
                <Text>Assign roles and permissions with ease.</Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight={"bold"} marginTop={"25px"}>Analytics Dashboard</Text>
                <Text>Gain insights into user activities.</Text>
              </Box>
            </Flex>
          </VStack>
        </Center>
      </Box>
    </>





  );
}

export default Home;

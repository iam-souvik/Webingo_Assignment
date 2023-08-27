/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react'
import axios from 'axios';
import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     Stack,
     Button,
     useColorModeValue,
     InputGroup,
     InputRightElement,
     Text,
     Heading,
     useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';


function Signin() {
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const Toast = useToast();
     const navigate = useNavigate();

     const usernameRef = useRef()
     const pwdRef = useRef()

     const handleLogin = () => {
          const user = {
               name: usernameRef.current.value,
               password: pwdRef.current.value
          }
          console.log('user:', user)
          
          axios.post("https://webingo-user-management.onrender.com/auth/login", user).then((res) => {
               const user = res.data.user;
               localStorage.setItem("USER", JSON.stringify(user));
               Toast({
                    title: res.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               if (user?.role === "admin") {
                    window.location.replace("/admin");
               } else if (user?.role === "manager") {
                    window.location.replace("/manager")
               } else {
                    window.location.replace("/");
               }
          }).catch((e) => {
               Toast({
                    title: e.response.statusText,
                    description: e.response.data.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
          }).finally(() => {
               setLoading(false)
          })

          usernameRef.current.value = "";
          pwdRef.current.value = "";
     }

     return (
          <Flex
               minH="100vh"
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign-in on our management site
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to maintain your tasks easily ✌️
                         </Text>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <Stack spacing={4}>
                              <FormControl id="username">
                                   <FormLabel>Username</FormLabel>
                                   <Input type="text" ref={usernameRef} />
                              </FormControl>
                              <FormControl id="password">
                                   <FormLabel>Password</FormLabel>
                                   <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} ref={pwdRef} />
                                        <InputRightElement h={'full'}>
                                             <span
                                                  role='button'
                                                  variant={'ghost'}
                                                  onClick={() =>
                                                       setShowPassword((showPassword) => !showPassword)
                                                  }>
                                                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                             </span>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <Stack spacing={10}>
                                   <Button
                                        isLoading={loading}
                                        loadingText='Wait'
                                        onClick={handleLogin}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                             bg: 'blue.500',
                                        }}>
                                        Log in
                                   </Button>
                              </Stack>
                              <Stack pt={6}>
                                   <Text align={'center'}>
                                        New user? <Link to="/register" style={{ color: 'blue' }} >SignUp</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     )
}

export default Signin
import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     InputGroup,
     HStack,
     InputRightElement,
     Stack,
     Button,
     Heading,
     Text,
     useColorModeValue,
     useToast,
     Select
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'



export default function Register() {
     const Toast = useToast();
     const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false)
     const [loading, setLoading] = useState(false);

     const initialState = {
          name: "",
          image: "",
          dob: "",
          email: "",
          password: "",
          phoneNumber: "",
          role: ""
     }
     const [data, setData] = useState(initialState);


     function handleClick() {
          setLoading(true);
          console.log({ data })
          axios.post("http://localhost:8080/auth/signup", data).then((res) => {
               Toast({
                    title: res.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               setData(initialState)
               navigate("/login")

          }).catch((e) => {
               setData(initialState)
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

     }

     const handleChange = (e) => {
          e.preventDefault()
          const { name, value } = e.target;
          setData({ ...data, [name]: value })
     }

     return (
          <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={12} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign up
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to enjoy all of our cool features ✌️
                         </Text>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <Stack spacing={4}>
                              <FormControl id="firstName" isRequired>
                                   <FormLabel>Name</FormLabel>
                                   <Input name='name' type="text" onChange={handleChange} />
                              </FormControl>
                              <FormControl isRequired>
                                   <FormLabel>Select Your Role</FormLabel>
                                   <Select placeholder='Select option' onChange={handleChange} name='role'>
                                        <option value='user'>user</option>
                                        <option value='manager'>Manager</option>
                                        <option value='admin'>Admin</option>
                                   </Select>
                              </FormControl>
                              <FormControl id="image">
                                   <FormLabel>Image</FormLabel>
                                   <Input name='image' type="url" onChange={handleChange} />
                              </FormControl>
                              <FormControl id="dob" isRequired>
                                   <FormLabel>Date of Birth</FormLabel>
                                   <Input name='dob' type="date" onChange={handleChange} />
                              </FormControl>
                              <FormControl id="email" isRequired>
                                   <FormLabel>Email Address</FormLabel>
                                   <Input name='email' type="email" onChange={handleChange} />
                              </FormControl>
                              <FormControl id="phone" isRequired>
                                   <FormLabel>Phone no</FormLabel>
                                   <Input name='phoneNumber' type="number" onChange={handleChange} />
                              </FormControl>
                              <FormControl id="password" isRequired>
                                   <FormLabel>Password</FormLabel>
                                   <InputGroup>
                                        <Input name='password' type={showPassword ? 'text' : 'password'} onChange={handleChange} />
                                        <InputRightElement h={'full'}>
                                             <Button
                                                  variant={'ghost'}
                                                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                             </Button>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <Stack spacing={10} pt={2}>
                                   <Button
                                        onClick={handleClick}
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                             bg: 'blue.500',
                                        }}>
                                        Sign up
                                   </Button>

                              </Stack>
                              <Stack pt={6}>
                                   <Text align={'center'}>
                                        Already a user?  <Link to="/login" style={{ color: "skyblue" }}>Login</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     )
}
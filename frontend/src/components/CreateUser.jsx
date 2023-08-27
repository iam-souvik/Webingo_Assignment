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





     async function handleRegister(event) {
          event.preventDefault();

          const { name, dob, email, phoneNumber, password, image, role } = event.target;
          const profile = await uploadImagesInCloudinary(image.files[0])

          if (!profile) {
               return Toast({
                    title: "Error in image upload!",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
          }

          const data = {
               name: name.value,
               dob: dob.value,
               email: email.value,
               phoneNumber: phoneNumber.value,
               password: password.value,
               image: profile,
               role: role.value
          }

          setLoading(true);


          axios.post("https://webingo-user-management.onrender.com/manager", data).then((res) => {
               Toast({
                    title: res.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })

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
               event.target.reset();
          })

     }

     async function uploadImagesInCloudinary(file) {
          if (!file) return '';
          try {
               const data = new FormData();
               data.append('file', file);
               data.append('upload_preset', 'qljtwtyg');
               const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/dwxjlreqs/image/upload',
                    data
               );

               console.log('image-url', res.data.secure_url);
               return res.data.secure_url;
          } catch (error) {
               console.log(error);
          }
     };


     return (
          <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} width={"600px"} py={12} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              User Created By Manager
                         </Heading>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <form onSubmit={handleRegister}>
                              <Stack spacing={4}>
                                   <FormControl id="firstName" isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input id='name' type="text" />
                                   </FormControl>
                                   <FormControl isRequired>
                                        <FormLabel>Select Your Role</FormLabel>
                                        <Select placeholder='Select option' id='role' defaultValue="user">
                                             <option value='user'>user</option>
                                             <option value='manager' disabled>Manager</option>
                                             <option value='admin' disabled>Admin</option>
                                        </Select>
                                   </FormControl>
                                   <FormControl id="image">
                                        <FormLabel>Image</FormLabel>
                                        <Input id='image' type="file" accept="image/jpeg" />
                                   </FormControl>
                                   <FormControl id="dob" isRequired>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <Input id='dob' type="date" />
                                   </FormControl>
                                   <FormControl id="email" isRequired>
                                        <FormLabel>Email Address</FormLabel>
                                        <Input id='email' type="email" />
                                   </FormControl>
                                   <FormControl id="phone" isRequired>
                                        <FormLabel>Phone no</FormLabel>
                                        <Input id='phoneNumber' type="number" />
                                   </FormControl>
                                   <FormControl id="password" isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                             <Input id='password' type={showPassword ? 'text' : 'password'} />
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
                                             isLoading={loading}
                                             type='submit'
                                             loadingText="Submitting"
                                             size="lg"
                                             bg={'blue.400'}
                                             color={'white'}
                                             _hover={{
                                                  bg: 'blue.500',
                                             }}>
                                             Create User
                                        </Button>

                                   </Stack>
                              </Stack>
                         </form>
                    </Box>
               </Stack>
          </Flex>
     )
}





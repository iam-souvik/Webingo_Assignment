import {
     Heading,
     Table,
     Thead,
     Tbody,
     Tr,
     Th,
     Td,
     TableContainer,
     Spinner,
     Avatar,
     Button,
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalCloseButton,
     useDisclosure,
     Stack,
     FormControl,
     FormLabel,
     Input,
     Select,
} from '@chakra-ui/react'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
     const { isOpen, onOpen, onClose } = useDisclosure();
     const Toast = useToast();
     const navigate = useNavigate();
     const [managers, setManagers] = useState([]);
     const [editableContent, setEditableContent] = useState(null);
     const [loading, setLoading] = useState(false);

     /// get-Profile -data
     const getProfile = async () => {
          setLoading(true)
          try {
               const res = await axios.get(`https://webingo-user-management.onrender.com/manager`, {
                    headers: {
                         'authorization': JSON.parse(localStorage.getItem("USER")).token,
                         "Content-Type": "aplication/json"
                    }
               });

               Toast({
                    title: res.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               setManagers(res.data.users);
               setLoading(false)

          } catch (error) {
               console.log(error)
               Toast({
                    title: error?.response?.statusText || error.message,
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               setLoading(false)
          }
     }

     const deleteProfile = async (id) => {
          try {
               const res = await axios.delete(`https://webingo-user-management.onrender.com/manager/${id}`, {
                    headers: {
                         "Authorization": JSON.parse(localStorage.getItem("USER")).token,
                    }
               });
               console.log('res:', res)

               Toast({
                    title: res.data?.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })

               getProfile();

          } catch (error) {
               console.log('error:', error)
               Toast({
                    title: error?.response?.statusText || error.message,
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
          }
     }

     const handleProfileUpdate = async (event) => {
          event.preventDefault();
          if (editableContent === null) return;

          setLoading(true)

          const { name, dob, email, phoneNumber, image, role } = event.target;

          const update = {}

          // If we have any new value then only update that content
          if (name.value && name.value !== editableContent.name) update.name = name.value;
          if (dob.value && dob.value !== editableContent.dob) update.dob = dob.value;
          if (email.value && email.value !== editableContent.email) update.email = email.value;
          if (phoneNumber.value && phoneNumber.value !== editableContent.phoneNumber) update.phoneNumber = phoneNumber.value;
          if (image.value && image.value !== editableContent.image) update.image = image.value;
          if (role.value && role.value !== editableContent.role) update.role = role.value;


          try {
               const res = await axios.patch(`https://webingo-user-management.onrender.com/manager/${editableContent._id}`, update, {
                    headers: {
                         "Authorization": JSON.parse(localStorage.getItem("USER")).token,
                         "Content-Type": "application/json",
                    }
               });

               Toast({
                    title: res.data?.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })

               getProfile();
          } catch (error) {
               console.log('error:', error)
               Toast({
                    title: error?.response?.statusText || error.message,
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               
          } finally {
               setLoading(false)
               event.target.reset();
               onClose();
               setEditableContent(null);
          }
     }



     useEffect(() => {
          if (JSON.parse(localStorage.getItem("USER"))?.role !== "admin") {
               Toast({
                    description: "You're not an admin, so you aren't authorized to access this page!",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: "top"
               })
               navigate("/")
          }else{
               getProfile();
          }
     }, [])

     return (
          <div>
               {loading ? (
                    <Spinner ml={"600px"} size="xl" mt={250} color="teal" thickness="4px" speed="0.65s" emptyColor="gray.200" />
               ) : (
                    <>


                         <Heading textAlign="center" margin={"auto"} mt={"100px"}>Admin Page</Heading>
                         <TableContainer>
                              <Table variant='striped' colorScheme='teal'>
                                   <Thead>
                                        <Tr>
                                             <Th>S. No</Th>
                                             <Th>Name</Th>
                                             <Th>Email</Th>
                                             <Th>Image</Th>
                                             <Th>phone Num</Th>
                                             <Th>Role</Th>
                                             <Th>DOB</Th>
                                             <Th>Edit</Th>
                                             <Th>Delete</Th>
                                        </Tr>
                                   </Thead>
                                   <Tbody>
                                        {
                                             managers.map((e, i) => {
                                                  return (
                                                       <Tr key={e._id}>
                                                            <Td>{i + 1}</Td>
                                                            <Td>{e.name}</Td>
                                                            <Td>{e.email}</Td>
                                                            <Td>
                                                                 <Avatar name={e.name} src={e.image} />
                                                            </Td>
                                                            <Td>{e.phoneNumber}</Td>
                                                            <Td>{e.role}</Td>
                                                            <Td>{e.dob}</Td>
                                                            <Td>
                                                                 <Button colorScheme='blue' onClick={() => {
                                                                      setEditableContent(e)
                                                                      onOpen()
                                                                 }}>Edit</Button>
                                                            </Td>
                                                            <Td>
                                                                 < Button colorScheme='red' onClick={() => {
                                                                      deleteProfile(e._id)
                                                                 }}>Delete</Button>
                                                            </Td>
                                                       </Tr>
                                                  )
                                             })
                                        }
                                   </Tbody>
                              </Table>
                         </TableContainer>

                         <Modal isOpen={isOpen} onClose={() => {
                              setEditableContent(null);
                              onClose();
                         }}>
                              <ModalOverlay />
                              <ModalContent>
                                   <ModalHeader>Update User</ModalHeader>
                                   <ModalCloseButton />
                                   <ModalBody>
                                        <form onSubmit={handleProfileUpdate}>
                                             <Stack spacing={4}>
                                                  <FormControl isRequired>
                                                       <FormLabel>Name</FormLabel>
                                                       <Input id='name' type="text" defaultValue={editableContent?.name} />
                                                  </FormControl>
                                                  <FormControl isRequired>
                                                       <FormLabel>Select Your Role</FormLabel>
                                                       <Select id='role' placeholder='Select option' defaultValue={editableContent?.role}>
                                                            <option value='user'>user</option>
                                                            <option value='manager'>Manager</option>
                                                            <option value='admin'>Admin</option>
                                                       </Select>
                                                  </FormControl>
                                                  <FormControl isRequired>
                                                       <FormLabel>Image</FormLabel>
                                                       <Input id='image' type="url" defaultValue={editableContent?.image} />
                                                  </FormControl>
                                                  <FormControl isRequired>
                                                       <FormLabel>Date of Birth</FormLabel>
                                                       <Input id='dob' type="date" defaultValue={editableContent?.dob} />
                                                  </FormControl>
                                                  <FormControl isRequired>
                                                       <FormLabel>Email Address</FormLabel>
                                                       <Input id='email' type="email" defaultValue={editableContent?.email} />
                                                  </FormControl>
                                                  <FormControl isRequired>
                                                       <FormLabel>Phone no</FormLabel>
                                                       <Input id='phoneNumber' type="number" defaultValue={editableContent?.phoneNumber} />
                                                  </FormControl>
                                                  <Button type='submit' colorScheme='blue'>Update</Button>
                                             </Stack>
                                        </form>
                                   </ModalBody>
                              </ModalContent>
                         </Modal>
                    </>
               )}
          </div>
     )
}

export default AdminPanel
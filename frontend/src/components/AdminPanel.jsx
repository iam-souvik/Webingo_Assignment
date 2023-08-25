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
   } from '@chakra-ui/react'
   import axios from 'axios';
   import React, { useEffect, useState } from 'react'
   import { useToast } from '@chakra-ui/react';
   
   const UserPanel = () => {
   
     const Toast = useToast();
     const [manager, setManager] = useState([]);
     console.log("manager", manager);
     const [loading, setLoading] = useState(false);
   
     /// get-Profile -data
     const getProfile = async () => {
         setLoading(true)
         try {
             const res = await axios.get(`http://localhost:8080/manager`, {
                 headers: {
                     'authorization': JSON.parse(localStorage.getItem("MANAGER")).token,
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
             setManager(res.data.manager);
             setLoading(false)
   
         } catch (error) {
             console.log(error)
             Toast({
                 title: error.response?.statusText,
                 description: error.response?.data?.message,
                 status: 'error',
                 duration: 4000,
                 isClosable: true,
                 position: "top"
             })
             setLoading(false)
         }
     }
   
   
   
   
     useEffect(() => {
         getProfile();
   
     }, [])
   
     return (
         <div>
             {loading ? (
                 <Spinner size="xl" mt={250} color="teal" thickness="4px" speed="0.65s" emptyColor="gray.200" />
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
                                 </Tr>
                             </Thead>
                             <Tbody>
                                 {
                                     manager.map((e, i) => {
                                         return (
                                             <Tr key={e._id}>
                                                 <Td>{i + 1}</Td>
                                                 <Td>{e.name}</Td>
                                                 <Td>{e.email}</Td>
                                                 <Td>{e.image}</Td>
                                                 <Td>{e.phoneNumber}</Td>
                                                 <Td>{e.role}</Td>
                                                 <Td>{e.dob}</Td>
                                             </Tr>
                                         )
                                     })
                                 }
                             </Tbody>
                         </Table>
                     </TableContainer>
                 </>
             )}
         </div>
     )
   }
   
   export default UserPanel
import { Box, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <Flex p={4} bg="gray.700" color="white">
            <Box>
                <Link to="/">Home</Link>
            </Box>
            <Spacer />
            <Box display={"flex"} gap={10}>
                <Link to="/admin">Admin Panel</Link>
                <Link to="/manager">Manager Panel</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Signup</Link>
            </Box>
        </Flex>
    )
}

export default Navbar

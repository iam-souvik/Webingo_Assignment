// Navbar.js

import { Avatar, Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    React.useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('USER'))?.token;
        if (userToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false)
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("USER")
        setIsLoggedIn(false);
    };

    return (
        <Flex p={4} bg="gray.700" color="white" position="sticky">
            <Box>
                <Link to="/">Home</Link>
            </Box>
            <Spacer />
            <Box display={'flex'} gap={10}>
                <Link to="/admin">Admin Panel</Link>
                <Link to="/manager">Manager Panel</Link>
                {isLoggedIn ? (
                    <>
                        <HStack title={JSON.parse(localStorage.getItem("USER")).name}>
                            <Avatar size="sm" name={JSON.parse(localStorage.getItem("USER")).name} src={JSON.parse(localStorage.getItem("USER")).image} />
                            <Text textTransform="capitalize">{JSON.parse(localStorage.getItem("USER")).role}</Text>
                        </HStack>
                        <Link to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Signup</Link>
                    </>
                )}
            </Box>
        </Flex>
    );
}

export default Navbar;

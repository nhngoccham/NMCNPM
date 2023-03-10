import React from 'react';
import axios from '@/../node_modules/axios/index';
import authAPIs from '@/apis/auth';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useHistory } from "react-router-dom";


export default function ForgotPasswordForm() {
    const [state, setState] = useState({ email: "" });
    const [status, setStatus] = useState({ success: "", message: "" });

    const history = useHistory();

    const handleOnChange = ({ target }) => {
        setState(s => ({ ...s, email: target.value }))
    }

    const handleSubmit = async () => {
        const res = await authAPIs.forgotPassword(state);

        if (res.success) {
            alert('Email sent successfully');
            history.push('/login');
        }
        else setStatus(s => ({ ...s, message: res.message }))
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    You&apos;ll get an email with your new password
                </Text>

                {status.message
                    ? <Text
                        fontSize={{ base: 'sm', sm: 'md' }}
                        color="red">
                        {status.message}
                    </Text>
                    : ""
                }

                <FormControl id="email">
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={state.email}
                        onChange={handleOnChange}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={handleSubmit}
                    >
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
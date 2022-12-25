import React, { useState, useEffect } from 'react';
import {
    InputGroup,
    Input,
    InputRightElement,
    Button,
    HStack,
    Box,
    SimpleGrid
} from '@chakra-ui/react';
import AddLeague from './AddLeague/AddLeague';
import LeagueCard from '@/components/LeagueCard/LeagueCard';
import leagueAPIs from 'apis/league';
// import ReactFullPageLoading from "react-fullpage-custom-loader";

export default function DsGiaiDau() {
    const [state, setState] = useState({
        data: null,
        isLoading: false
    })

    const getData = async () => {
        setState(s => ({
            ...s,
            isLoading: true
        }))
        try {
            const { data } = await leagueAPIs.getAll();
            setState(s => ({
                ...s,
                data: data
            }))

        } finally {
            setState(s => ({
                ...s,
                isLoading: false
            }))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleReload = () => {
        getData()
    }

    // if (state.isLoading) return <ReactFullPageLoading />

    return (
        <Box p={10}>
            <HStack spacing="30px">
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={'text'}
                        placeholder='Nhập tên giải đấu'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' bg={'blue.300'} _hover={{ bg: 'blue.200' }}>
                            Tìm
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <AddLeague onChange={handleReload}>Tạo giải đấu</AddLeague>
            </HStack>
            <SimpleGrid columns={4} my={6} spacing="20px">
                {state.data && state.data.map((league, idx) => <LeagueCard data={league} key={idx} />)}
            </SimpleGrid>
        </Box>
    )
}

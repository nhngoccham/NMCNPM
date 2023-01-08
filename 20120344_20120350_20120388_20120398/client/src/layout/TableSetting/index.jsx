import React from 'react';
import {
    Flex,
    Box,
    FormControl,
    HStack,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import TableModal from './TableModal/TableModal';
import leagueAPIs from '@/apis/league';
import roundAPIs from '@/apis/round';
import { ROUND_TYPE } from '@/constants/index';

export default function ThietLapBangDau() {
    const bgColorGray = useColorModeValue('gray.50', 'gray.800');
    const bgColorWhite = useColorModeValue('white', 'gray.800');

    const { leagueId, roundId = null } = useParams();

    const [state, setState] = useState({
        leagueData: null,
        rounds: null,
        roundId: roundId,
        tables: null,
        isLoading: false
    });

    const getData = async (roundId = null) => {
        if (state.isLoading) return;

        setState(s => ({ ...s, isLoading: true }));
        try {
            const { data: leagueData } = await leagueAPIs.getById(leagueId);
            const { data: rounds } = await leagueAPIs.getRounds(leagueId);
            let tables = null;

            if (roundId) {
                tables = (await roundAPIs.getTables(roundId)).data;
            }
            else
                setState(s => ({ ...s, tables: null }));

            setState(s => ({ ...s, leagueData, rounds, tables }));
        }
        finally {
            setState(s => ({ ...s, isLoading: false }));
        }
    }

    useEffect(() => {
        getData(roundId);
    }, []);

    const handleOnSelect = ({ target }) => {
        setState(s => ({ ...s, roundId: target.value }));
        getData(target.value);
    }

    const handleOnChange = () => {
        getData(state.roundId);
    }

    const checkRoundType = (roundId) => { 
        if (!state.rounds) return;

        const round = state.rounds.find(round => round._id === roundId); 
        return (round.type === ROUND_TYPE.TABLE)
    }

    // if (state.isLoading) return <ReactFullPageLoading />

    console.log(state.rounds)

    return (
        <>
            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={bgColorGray}>
                <Stack spacing={8} mx={'auto'} width={'50%'} mt={6} px={6}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Thiết lập bảng đấu
                    </Heading>
                    <Box
                        rounded={'lg'}
                        bg={bgColorWhite}
                        boxShadow={'lg'}
                        p={8}>
                        {state.leagueData && <Heading fontSize={'2xl'} mb={5} textAlign={'center'}>{state.leagueData.name}</Heading>}
                        <Stack spacing={4}>
                            <HStack>
                                <FormControl>
                                    <Select placeholder='Chọn vòng đấu' value={state.roundId} onChange={handleOnSelect}>
                                        {state.rounds && state.rounds.map(round => <option value={round._id}>{round.name}</option>)}
                                    </Select>
                                </FormControl>
                                <TableModal roundId={state.roundId} isDisabled={checkRoundType(state.roundId)} onChange={handleOnChange} />
                            </HStack>

                            {state.tables && state.tables.map(table => (<HStack>
                                <Box border='1px' borderColor='gray.200' flex={1} p={2} borderRadius='md'>{table.name}</Box>
                                <Button
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Sửa
                                </Button>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.500',
                                    }}>
                                    Xóa
                                </Button>
                                <Link to={`/leagues/${leagueId}/rounds/${state.roundId}/tables/${table._id}/match-setting`}>
                                    <Button
                                        variant='outline'
                                        colorScheme='blue'>
                                        Thêm trận đấu
                                    </Button>
                                </Link>
                            </HStack>))}
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
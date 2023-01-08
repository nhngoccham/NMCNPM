import React from 'react';
import {
    Flex,
    Box,
    HStack,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import RoundModal from './RoundModal/RoundModal';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import leagueAPIs from '@/apis/league';
import { ROUND_TYPE } from '@/constants/index';

const withTable = (roundType) => {
    return (roundType === ROUND_TYPE.TABLE)
}

export default function RoundSetting() {
    const { leagueId } = useParams();
    const [state, setState] = useState({
        roundData: null,
        leagueData: null,
        isLoading: false
    });

    const bgColorGray = useColorModeValue('gray.50', 'gray.800');
    const bgColorWhite = useColorModeValue('white', 'gray.800');

    const getData = async () => {
        setState(s => ({
            ...s,
            isLoading: true
        }))

        try {
            const { data: leagueData } = await leagueAPIs.getById(leagueId);
            const { data: roundData } = await leagueAPIs.getRounds(leagueId);

            setState(s => ({
                ...s,
                leagueData: leagueData,
                roundData: roundData
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
        getData();
    }

    // if (state.isLoading) return <ReactFullPageLoading />

    return (
        <>
            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={bgColorGray}>
                <Stack spacing={8} mx={'auto'} width={'50%'} mt={6} px={6}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Thiết lập vòng đấu
                    </Heading>
                    <Box
                        rounded={'lg'}
                        bg={bgColorWhite}
                        boxShadow={'lg'}
                        p={8}>
                        {state.leagueData && <Heading fontSize={'2xl'} mb={6} textAlign={'center'}>{state.leagueData.name}</Heading>}

                        <Stack spacing={4}>
                            <RoundModal leagueId={leagueId} onChange={handleReload} />
                            {state.roundData &&
                                state.roundData.map(round => (
                                    <HStack>
                                        <Box border='1px' borderColor='gray.200' flex={1} p={2} borderRadius='md'>{round.name}</Box>
                                        {/* <Button
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
                                        </Button> */}
                                        {withTable(round.type) ?
                                            <Link to={`/leagues/${leagueId}/rounds/${round._id}/table-setting`}>
                                                <Button
                                                    variant='outline'
                                                    maxW={'140px'}
                                                    colorScheme='green'>
                                                    Thêm bảng đấu
                                                </Button>
                                            </Link>
                                            :
                                            <Link to={`/leagues/${leagueId}/rounds/${round._id}/match-setting`}>
                                                <Button
                                                    variant='outline'
                                                    maxW={'140px'}
                                                    colorScheme='blue'>
                                                    Thêm trận đấu
                                                </Button>
                                            </Link>
                                        }


                                    </HStack>
                                ))
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
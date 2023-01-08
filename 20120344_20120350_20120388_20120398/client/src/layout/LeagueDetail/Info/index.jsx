import React from 'react';
import {
    Button,
    Box,
    Stack,
    Text,
    UnorderedList,
    ListItem,
    Center,
    useColorModeValue,
    Link,
    HStack
} from '@chakra-ui/react';

import TeamItem from '../Team/index';
import Submission from '../Submission/index';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { STATUS } from '@/constants/index';
import { useSelector } from "react-redux";

export default function ThongTin({ data }) {
    const bg = useColorModeValue('white', 'gray.900');
    const { id: leagueId } = useParams();
    const auth = useSelector((state) => state?.userReducer || {});
    const { isAdmin } = data;

    if (!data) return <dix></dix>

    const teamSubmissions = data.teams?.filter(item => item.status === STATUS.PENDING) || []

    return (
        <>
            {isAdmin && 
                <HStack mb={6} width={'100%'} spacing={10}>
                    <Link href={`/leagues/${leagueId}/round-setting`} width='25%' style={{ textDecoration: 'none' }}>
                        <Button
                            size='md'
                            height='48px'
                            width='100%'
                            border='2px'
                            borderColor='blue.500'
                        >
                            Thiết lập vòng đấu
                        </Button>
                    </Link>
                    <Link href={`/leagues/${leagueId}/table-setting`} width='25%' style={{ textDecoration: 'none' }}>
                        <Button
                            size='md'
                            height='48px'
                            width='100%'
                            border='2px'
                            borderColor='blue.500'
                        >
                            Thiết lập bảng đấu
                        </Button>
                    </Link>
                    <Link href={`/leagues/${leagueId}/match-setting`} width='25%' style={{ textDecoration: 'none' }}>
                        <Button
                            size='md'
                            height='48px'
                            width='100%'
                            border='2px'
                            borderColor='blue.500'
                        >
                            Thiết lập trận đấu
                        </Button>
                    </Link>
                    {/* <Button
                        size='md'
                        height='48px'
                        width='25%'
                        border='2px'
                        borderColor='blue.500'
                    >
                        Tạo lịch thi đấu (ngẫu nhiên)
                    </Button> */}
                </HStack>
            }
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Box
                    flex={2}
                    width={'100%'}
                    height={'500px'}
                    bg={bg}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Text
                        bg={'#AC5050'}
                        color={'white'}
                        fontWeight="bold"
                        mt={-6}
                        mx={-6}
                        mb={6}
                        p={4}
                        fontSize='xl'
                        align={'center'}>
                        {data.name}
                    </Text>
                    <Stack>
                        <Text fontSize='lg'>
                            Hạn đăng kí: {moment(data.registerDate).format()}
                        </Text>
                        <Text fontSize='lg'>
                            Số đội đăng kí: {data?.teams?.lengh}
                        </Text>
                        <Text fontSize='lg'>
                            Thời gian bắt đầu: {moment(data.startDate).format()}
                        </Text>
                        <Text fontSize='lg'>
                            Thời gian kết thúc: {moment(data.endDate).format()}
                        </Text>

                        <Text fontSize='lg'>
                            Quy định giải đấu:
                        </Text>
                        <UnorderedList pl={8}>
                            <ListItem>Giới tính: {data.gender}</ListItem>
                            <ListItem>Độ tuổi: {data.minAgeMember} - {data.maxAgeMember}</ListItem>
                        </UnorderedList>
                    </Stack>
                    {auth.accessToken && <Center>
                        <Submission data={data}>
                            Nộp đồ sơ
                        </Submission>
                    </Center>}
                </Box>
                <Stack spacing={6} px={8} w={'full'} flex={3} >
                    {
                        teamSubmissions.map((item, idx) => (
                            <TeamItem key={JSON.stringify({ item, idx })} data={item} league={data} />
                        ))
                    }
                </Stack>
            </Stack>
        </>
    );
}
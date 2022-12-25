import React from 'react';
import moment from 'moment'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
    Link,
} from '@chakra-ui/react';

export default function LeagueCard({ data }) {
    const { _id: id, logo, name, startDate, endDate, registerDate } = data;

    return (
        <Link href={`/leagues/${id}/intro`} style={{ textDecoration: 'none' }}>
            <Center>
                <Box
                    maxW={'445px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Center
                        h={'210px'}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={'relative'}
                        overflow='hidden'>
                        <Image
                            src={logo}
                            h={'100%'}
                            layout={'fit'}
                        />
                    </Center>
                    <Stack>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.800'}>
                            Nộp hồ sơ: {moment(registerDate).format('LL')}
                        </Text>
                        <Text color={'gray.800'}>
                            Bắt đầu: {moment(startDate).format('LL')}
                        </Text>
                        <Text color={'gray.800'}>
                            Kết thúc: {moment(endDate).format('LL')}
                        </Text>
                    </Stack>
                </Box>
            </Center>
        </Link>
    );
}
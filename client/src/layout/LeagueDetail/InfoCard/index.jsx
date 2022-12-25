import React from 'react';
import moment from 'moment'
import {
    Box,
    Center,
    Heading,
    Text,
    HStack,
    Stack,
    Button,
    useColorModeValue,
    Image,
    Link,
} from '@chakra-ui/react';
import { FiCheckSquare } from 'react-icons/fi';
import leagueAPIs from '@/apis/league';
import { useParams } from 'react-router-dom';

export default function InfoCard({ data, isPayed, isAdmin, onChange = () => { } }) {
    const { _id: id, logo, avatar, name, description, foundedDate, birthday, position, number } = data;
    const { id: leagueId } = useParams();

    const handlePay = async () => {
        await leagueAPIs.pay(leagueId, id);
        onChange();
    }

    return (
        <Center>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={5}
                overflow={'hidden'}>
                <Center
                    h={'210px'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow='hidden'>

                    <Image
                        src={logo || avatar}
                        h={'100%'}
                        layout={'fit'}
                    />
                </Center>
                <HStack>
                    <Link flex={3} href={`/teams/${id}/intro`}>
                        <Stack>
                            <Heading
                                color={useColorModeValue('gray.700', 'white')}
                                fontSize={'2xl'}
                                fontFamily={'body'}>
                                {name}
                            </Heading>
                            <Text color={'gray.500'}>
                                {description || `${position}(${number})`}
                            </Text>
                            <Text color={'gray.500'}>
                                {moment(foundedDate || birthday).format()}
                            </Text>
                        </Stack>
                    </Link>
                    {isPayed &&
                        <Box flex={1} align={'center'}>
                            <FiCheckSquare style={{ margin: 'auto', color: 'teal', fontSize: "2rem" }} />
                            <Text as='sub'>Đã thu phí</Text>
                        </Box>
                    }
                    {!isPayed && isAdmin &&
                        <Box flex={1} align={'center'}>
                            <Button
                                size='sm'
                                height='35px'
                                width='100%'
                                border='2px'
                                borderColor='blue.500'
                                onClick={handlePay}
                            >
                                Đóng phí
                            </Button>
                        </Box>
                    }
                </HStack>
            </Box>
        </Center>
    );
}
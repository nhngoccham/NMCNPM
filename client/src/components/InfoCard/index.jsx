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

export default function InfoCard({ data }) {
    const { _id: id, logo, avatar, name, description, foundedDate, birthday, position, number } = data;

    return (
        <Link href={`/teams/${id}/intro`}>
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
                            src={logo || avatar}
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
                        <Text isTruncated color={'gray.500'}>
                            {description || `${position}(${number})`}
                        </Text>
                        <Text color={'gray.500'}>
                            {moment(foundedDate || birthday).format()}
                        </Text>
                    </Stack>
                </Box>
            </Center>
        </Link>
    );
}
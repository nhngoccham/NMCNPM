import React from 'react';
import moment from "moment";
import {
    Box,
    Flex,
    Heading,
    Image,
    Skeleton,
    Stack,
    useColorModeValue,
    Text,
    Center,
    HStack,
} from "@chakra-ui/react";

export default function GioiThieu({ data }) {
    const { logo, name, description, foundedDate, primaryKit, secondaryKit } =
        data;

    return (
        <Box
            maxW="7xl"
            mx="auto"
            px={{
                base: "0",
                lg: "12",
            }}
            py={{
                base: "0",
                lg: "0",
            }}
        >
            <Stack
                direction={{
                    base: "column-reverse",
                    lg: "row",
                }}
                spacing={{
                    base: "0",
                    lg: "20",
                }}
            >
                <Flex flex="1" overflow="hidden">
                    <Image
                        src={logo}
                        fallback={<Skeleton />}
                        maxH="450px"
                        minW="300px"
                        objectFit="contain"
                        flex="1"
                    />
                </Flex>
                <Box
                    width={{
                        lg: "sm",
                    }}
                    transform={{
                        base: "translateY(-50%)",
                        lg: "none",
                    }}
                    bg={{
                        base: useColorModeValue("red.50", "gray.700"),
                        lg: "transparent",
                    }}
                    mx={{
                        base: "6",
                        md: "8",
                        lg: "0",
                    }}
                    px={{
                        base: "6",
                        md: "8",
                        lg: "0",
                    }}
                >
                    <Stack
                        spacing={{
                            base: "8",
                            lg: "10",
                        }}
                    >
                        {/* <Image src={logo}
                            fallback={<Skeleton />}
                            maxH="200px"
                            objectFit="contain"
                        /> */}
                        <Stack
                            spacing={{
                                base: "2",
                                lg: "4",
                            }}
                        >
                            <Heading size="md" fontWeight="normal">
                                Tên câu lạc bộ
                            </Heading>
                            <Text color={"gray.500"}>{name}</Text>
                            <Heading size="md" fontWeight="normal">
                                Mô tả
                            </Heading>
                            <Text color={"gray.500"}>{description}</Text>
                            <Heading size="md" fontWeight="normal">
                                Ngày thành lập
                            </Heading>
                            <Text color={"gray.500"}>
                                {moment(foundedDate).format()}
                            </Text>
                        </Stack>
                        <Center>
                            <HStack spacing="6" m={0}>
                                <Flex flexDirection="column">
                                    <Heading size="md" fontWeight="normal">
                                        Áo chính
                                    </Heading>
                                    <Image
                                        src={primaryKit}
                                        maxW="200px"
                                        border="1px"
                                        borderColor="gray.200"
                                    />
                                </Flex>
                                <Flex flexDirection="column">
                                    <Heading size="md" fontWeight="normal">
                                        Áo phụ
                                    </Heading>
                                    <Image
                                        src={secondaryKit}
                                        maxW="200px"
                                        border="1px"
                                        borderColor="gray.200"
                                    />
                                </Flex>
                            </HStack>
                        </Center>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

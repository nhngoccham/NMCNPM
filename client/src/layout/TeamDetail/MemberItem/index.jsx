import React from "react";
import moment from "moment";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";
import AddUpdateMember from "../AddUpdateMember/index";

export default function MemberItem({
    data = {},
    member = {},
    onChange = () => {},
}) {
    const { avatar, name, birthday, position, number } = member;
    const { isAdmin = false } = data;
    return (
        <Center>
            <Box
                maxW={"445px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}
            >
                <Center
                    h={"210px"}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={"relative"}
                    overflow="hidden"
                >
                    <Image src={avatar} h={"100%"} layout={"fit"} />
                </Center>
                <Stack>
                    <Heading
                        color={useColorModeValue("gray.700", "white")}
                        fontSize={"2xl"}
                        fontFamily={"body"}
                    >
                        {name}
                    </Heading>
                    <Text color={"gray.500"}>{`${position}(${number})`}</Text>
                    <Text color={"gray.500"}>{moment(birthday).format()}</Text>
                </Stack>
                {isAdmin && (
                    <AddUpdateMember
                        onChange={onChange}
                        data={data}
                        member={member}
                    >
                        Chỉnh sửa
                    </AddUpdateMember>
                )}
            </Box>
        </Center>
    );
}

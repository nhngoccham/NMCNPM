import React, { memo } from "react";
import moment from "moment";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Image,
    Flex,
    Text,
} from "@chakra-ui/react";

const Schedule = ({ data = [] }) => {
    return (
        <Table variant="simple">
            <TableCaption>Lịch thi đấu mới nhất</TableCaption>
            <Thead>
                <Tr>
                    <Th>Đội nhà</Th>
                    <Th>Đội khách</Th>
                    <Th>Ngày thi đấu</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((match, idx) => (
                    <Tr key={`${match?._id}-${idx}`}>
                        <Td>
                            <Flex flexDirection="row" alignItems="center">
                                <Image
                                    borderRadius="full"
                                    boxSize="32px"
                                    src={match?.homeTeam?.detail?.logo || "_"}
                                    alt={match?.homeTeam?.detail?.name || "_"}
                                    marginRight={4}
                                />
                                <Text>
                                    {match?.homeTeam?.detail?.name || "_"}
                                </Text>
                            </Flex>
                        </Td>
                        <Td>
                            <Flex flexDirection="row" alignItems="center">
                                <Text>
                                    {match?.awayTeam?.detail?.name || "_"}
                                </Text>
                                <Image
                                    borderRadius="full"
                                    boxSize="32px"
                                    src={match?.awayTeam?.detail?.logo || "_"}
                                    alt={match?.awayTeam?.detail?.name || "_"}
                                    marginLeft={4}
                                />
                            </Flex>
                        </Td>
                        <Td>{moment(match?.date || moment()).format()}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default memo(Schedule);

import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    HStack,
    Box,
    Stack,
    Button,
    Text,
    Image,
} from "@chakra-ui/react";
import leagueAPIs from "@/apis/league";
import moment from "@/../node_modules/moment/moment";
import MatchScore from "./MatchScore/MatchScore";

function tableRow(row, isAdmin) {
    return (
        <Tr>
            <Td>
                <HStack justify={"end"}>
                    <Text>{row.homeTeam.detail?.name || ""}</Text>
                    <Image src={row.homeTeam.detail?.logo || ""} maxW="40px" />
                </HStack>
            </Td>
            <Td textAlign={"center"} w={0} p={0}>
                {row.homeTeam.goal || ""} - {row.awayTeam.goal || ""}
            </Td>
            <Td>
                <HStack justify={"start"}>
                    <Image src={row.awayTeam.detail?.logo || ""} maxW="40px" />
                    <Text>{row.awayTeam.detail?.name || ""}</Text>
                </HStack>
            </Td>
            <Td>{row.roundName}</Td>
            <Td>{row.tableName}</Td>
            <Td>{moment(row.date).format()}</Td>
            <Td>{row.stadium}</Td>
            {isAdmin && (
                <Td>
                    <Stack direction="row" spacing={4} align="center">
                        <MatchScore data={row} />
                        <Button colorScheme="red" variant="solid">
                            Xóa
                        </Button>
                    </Stack>
                </Td>
            )}
        </Tr>
    );
}

export default function LichThiDau({ data = null }) {
    const [state, setState] = useState({
        rounds: [],
        tables: [],
        matches: [],
        roundId: null,
        tableId: null,
        isEnded: null,
        isLoading: false,
    });

    const getData = async (roundId = null, tableId = null, isEnded = null) => {
        if (state.isLoading) return;

        setState((s) => ({ ...s, isLoading: true }));

        try {
            const { data: rounds } = await leagueAPIs.getRounds(data._id);
            let { data: matches } = await leagueAPIs.getAllMatches(data._id);

            matches.map((match) => {
                if (match.parent.roundId) {
                    match.tableName = match.parent.name;
                    match.roundName = match.parent.round.name;
                } else {
                    match.tableName = "-";
                    match.roundName = match.parent.name;
                }
                return match;
            });

            if (isEnded)
                matches = matches.filter(
                    (match) => match.isEnded === JSON.parse(isEnded)
                );

            setState((s) => ({ ...s, rounds, tables: [], matches }));
        } finally {
            setState((s) => ({ ...s, isLoading: false }));
        }
    };

    const handleSelect =
        (name) =>
        ({ target }) => {
            let temp = state;
            temp[name] = target.value;

            getData(temp.roundId, temp.tableId, temp.isEnded);

            setState((s) => ({ ...s, [name]: target.value }));
        };

    useEffect(() => {
        getData();
    }, []);

    if (!data) return <></>;

    const { isAdmin } = data;

    return (
        <>
            <HStack>
                <Box
                    flex={1}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                >
                    Giải đấu: {data.name}
                </Box>
                <Select
                    flex={1}
                    placeholder="Tất cả vòng đấu"
                    onChange={handleSelect("roundId")}
                >
                    {state.rounds.map((round) => (
                        <option
                            key={JSON.stringify(round)}
                            value={`${round._id}`}
                        >
                            {round.name}
                        </option>
                    ))}
                </Select>
                <Select
                    flex={1}
                    placeholder="Tất cả bảng đấu"
                    disabled={state.roundId ? false : true}
                    onChange={handleSelect("tableId")}
                >
                    {state.tables.map((table) => (
                        <option
                            key={JSON.stringify(table)}
                            value={`${table._id}`}
                        >
                            {table.name}
                        </option>
                    ))}
                </Select>
                <Select
                    flex={1}
                    placeholder="Tất cả"
                    onChange={handleSelect("isEnded")}
                >
                    <option value="false">Đã thi đấu</option>
                    <option value="true">Chưa thi đấu</option>
                </Select>
            </HStack>
            <Table mt={5} variant="simple">
                <Thead bg={"gray.200"}>
                    <Tr>
                        <Th></Th>
                        <Th textAlign={"center"} p={0}>
                            Trận
                        </Th>
                        <Th></Th>
                        <Th>Vòng</Th>
                        <Th>Bảng</Th>
                        <Th>Ngày</Th>
                        <Th>Sân đấu</Th>
                        {isAdmin && <Th textAlign={"center"}>Thao tác</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {state.matches.map((row) => tableRow(row, isAdmin))}
                </Tbody>
            </Table>
        </>
    );
}

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
    Text,
    Image,
} from "@chakra-ui/react";
import leagueAPIs from "@/apis/league";
import roundAPIs from "@/apis/round";
import moment from "@/../node_modules/moment/moment";

function tableRow(row) {
    return (
        <Tr>
            <Td>
                <HStack justify={"end"}>
                    <Text>{row.awayTeam.detail?.name || ""}</Text>
                    <Image src={row.awayTeam.detail?.logo || ""} maxW="40px" />
                </HStack>
            </Td>
            <Td textAlign={"center"} w={0} p={0}>
                -
            </Td>
            <Td>
                <HStack justify={"start"}>
                    <Image src={row.homeTeam.detail?.logo || ""} maxW="40px" />
                    <Text>{row.homeTeam.detail?.name || ""}</Text>
                </HStack>
            </Td>
            <Td>{row.roundName}</Td>
            <Td>{row.tableName}</Td>
            <Td>{moment(row.date).format()}</Td>
            <Td>{row.stadium}</Td>
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
            let tables = [];

            //Lấy tên vòng đấu
            matches.forEach((match) => {
                const round = rounds.find(
                    (round) => round._id === match.roundId
                );
                match.roundName = round.name;
            });

            if (roundId) {
                tables = (await roundAPIs.getTables(roundId)).data;
                matches = matches.filter((match) => match.roundId === roundId);

                // Lấy tên bảng đấu
                matches.forEach((match) => {
                    if (match.tableId) {
                        const table = tables.find(
                            (table) => table._id === match.tableId
                        );

                        if (table) match.tableName = table.name;
                    }
                });

                if (tableId)
                    matches = matches.filter(
                        (match) => match.tableId === tableId
                    );
            }

            if (isEnded)
                matches = matches.filter(
                    (match) => match.isEnded === JSON.parse(isEnded)
                );

            setState((s) => ({ ...s, rounds, tables, matches }));
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
                    placeholder="Chọn vòng đấu"
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
                    placeholder="Chọn bảng đấu"
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
                    </Tr>
                </Thead>
                <Tbody>{state.matches.map((row) => tableRow(row))}</Tbody>
            </Table>
        </>
    );
}

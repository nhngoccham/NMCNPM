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
    Stack,
    Button,
    Box,
    Text,
    Image,
} from "@chakra-ui/react";
import leagueAPIs from "@/apis/league";
import roundAPIs from "@/apis/round";
import moment from "@/../node_modules/moment/moment";
import { useParams } from "react-router-dom";
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import DetailSetting from "../DetailSetting/DetailSetting";
import tableAPIs from "@/apis/table";

function tableRow(row) {
    // console.log(row._id, row.tableName)
    return (
        <Tr>
            <Td>
                <HStack justify={"end"}>
                    <Text>{row.homeTeam.detail?.name || ""}</Text>
                    <Image src={row.homeTeam.detail?.logo || ""} maxW="40px" />
                </HStack>
            </Td>
            <Td textAlign={"center"} w={0} p={0}>
                -
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
            <Td>
                <Stack direction="row" spacing={4} align="center">
                    <DetailSetting data={row} />
                    <Button colorScheme="red" variant="solid">
                        Xóa
                    </Button>
                </Stack>
            </Td>
        </Tr>
    );
}

export default function LichThiDau({}) {
    const { leagueId } = useParams();
    const [state, setState] = useState({
        league: {},
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
            const { data: league } = await leagueAPIs.getById(leagueId);
            const { data: rounds } = await leagueAPIs.getRounds(leagueId);
            let { data: matches } = await leagueAPIs.getAllMatches(leagueId);
            let tables = [];

            // console.log(matches)

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

                if (tableId)
                    matches = matches.filter(
                        (match) => match.tableId === tableId
                    );
            }

            // Lấy tên bảng đấu
            matches.forEach(async (match) => {
                if (match.tableId) {
                    const { data: table } = await tableAPIs.getById(
                        match.tableId
                    );

                    if (table) match.tableName = table.name;
                }
            });

            if (isEnded)
                matches = matches.filter(
                    (match) => match.isEnded === JSON.parse(isEnded)
                );

            setState((s) => ({ ...s, matches, tables, league, rounds }));
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

    // if (state.isLoading) return <ReactFullPageLoading />;

    console.log(state.matches);

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
                    Giải đấu: {state.league.name}
                </Box>
                <Select
                    flex={1}
                    placeholder="Tất cả vòng đấu"
                    onChange={handleSelect("roundId")}
                    value={state.roundId}
                >
                    {state.rounds.map((round) => (
                        <option value={`${round._id}`}>{round.name}</option>
                    ))}
                </Select>
                <Select
                    flex={1}
                    placeholder="Tất cả bảng đấu"
                    disabled={state.roundId ? false : true}
                    onChange={handleSelect("tableId")}
                    value={state.tableId}
                >
                    {state.tables.map((table) => (
                        <option value={`${table._id}`}>{table.name}</option>
                    ))}
                </Select>
                <Select
                    flex={1}
                    placeholder="Tất cả"
                    onChange={handleSelect("isEnded")}
                    value={state.isEnded}
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
                        <Th textAlign={"center"}>Thao tác</Th>
                    </Tr>
                </Thead>
                <Tbody>{state.matches.map((row) => tableRow(row))}</Tbody>
            </Table>
        </>
    );
}

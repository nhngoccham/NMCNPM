import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Text,
    HStack,
    Box,
    Select,
} from "@chakra-ui/react";
import leagueAPIs from "@/apis/league";

export default function Rankings({ league = {} }) {
    const [state, setState] = React.useState({
        rounds: [],
        tables: [],
        standings: [],
        roundId: null,
        tableId: null,
        isLoading: true,
    });
    const getMeta = async () => {
        try {
            const { _id: id } = league;
            const { data: rounds } = await leagueAPIs.getRounds(id);
            console.log("rounds", rounds)

            let standings = [];

            await rounds.forEach(async (round) => {
                const { data } = await leagueAPIs.getStandings(
                    id,
                    "round",
                    round._id
                );

                standings.push(...data);
            });

            console.log("standings: ", standings)

            setState((s) => ({
                ...s,
                rounds,
                standings: standings
            }));
        } catch (e) {
        } finally {
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    };
  
    React.useEffect(() => {
        getMeta();
    }, []);

    const getStandingsByTable = async (tableId) => {
        try {
            const { _id: id } = league;
            const { data } = await leagueAPIs.getStandings(
                id,
                "table",
                tableId
            );
            setState((s) => ({
                ...s,
                standings: data,
            }));
        } catch (e) {
        } finally {
        }
    };
    const getStandingsByRound = async (roundId) => {
        try {
            const { _id: id } = league;
            const { data } = await leagueAPIs.getStandings(
                id,
                "round",
                roundId
            );
            setState((s) => ({
                ...s,
                standings: data,
            }));
        } catch (e) {
        } finally {
        }
    };

    const handleSelectRound = ({ target }) => {
        const tables =
            state.rounds.find((round) => round._id === target.value)?.tables ||
            [];
        if (tables.length === 0) {
            getStandingsByRound(target.value);
        }
        setState((s) => ({
            ...s,
            roundId: target.value,
            tables,
        }));
    };
    const handleSelectTable = ({ target }) => {
        getStandingsByTable(target.value);
        setState((s) => ({
            ...s,
            tableId: target.value,
        }));
    };

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
                    Gi???i ?????u: {league.name}
                </Box>
                <Select
                    flex={1}
                    placeholder="T???t c??? v??ng ?????u"
                    onChange={handleSelectRound}
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
                    placeholder="T???t c??? b???ng ?????u"
                    disabled={state.roundId ? false : true}
                    onChange={handleSelectTable}
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
            </HStack>
            <Table variant="simple" boxShadow="lg" mb={10}>
                <Thead>
                    <Tr>
                        <Th>?????i</Th>
                        <Th>Tr???n</Th>
                        <Th>Th???ng</Th>
                        <Th>H??a</Th>
                        <Th>B???i</Th>
                        <Th>B??n Th???ng</Th>
                        <Th>B??n B???i</Th>
                        <Th>+/-</Th>
                        <Th>??i???m</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {state.standings.map((data) => (
                        <Tr>
                            <Td>
                                <HStack>
                                    <Image
                                        src={data.detail.logo}
                                        w="30px"
                                        h="30px"
                                    />
                                    <Text>{data.detail.name}</Text>
                                </HStack>
                            </Td>
                            <Td>{data.matchesPlayed}</Td>
                            <Td>{data.won}</Td>
                            <Td>{data.draw}</Td>
                            <Td>{data.loss}</Td>
                            <Td>{data.goalsFor}</Td>
                            <Td>{data.goalsAgainst}</Td>
                            <Td>{data.goalsFor - data.goalsAgainst}</Td>
                            <Td>{data.points}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}

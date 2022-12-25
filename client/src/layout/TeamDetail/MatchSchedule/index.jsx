import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    HStack,
    Text,
    Image,
    Flex,
    Heading,
    Center,
} from "@chakra-ui/react";
import moment from "moment";
import teamAPIs from "@/apis/team";
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import { useHistory } from "react-router";
function TableRow({ data }) {
    const history = useHistory();
    const {
        parent,
        league,
        homeTeam = {},
        awayTeam = {},
        date,
        stadium,
        isEnded = false,
    } = data;
    const result = isEnded
        ? `${homeTeam.goal || 0} - ${awayTeam.goal || 0}`
        : "-";
    const leagueName = parent.round?._id
        ? `${league.name} (${parent.name} - ${parent.round.name})`
        : `${league.name} (${parent.name})`;
    const handleTeamNav = (id) => (e) => {
        e.preventDefault();
        history.push(`/teams/${id}/intro`);
    };
    const handleLeagueNav = (id) => () => {
        history.push(`/leagues/${id}/intro`);
    };
    return (
        <Tr>
            <Td>
                <Flex flexDirection="row" justifyContent="space-between">
                    <HStack
                        cursor="pointer"
                        onClick={handleTeamNav(homeTeam.id)}
                    >
                        <Text>{homeTeam.detail.name}</Text>
                        <Image src={homeTeam.detail.logo} maxW="40px" />
                    </HStack>
                    <Center>
                        <Heading as="h1" align={"center"} size="lg">
                            {result}
                        </Heading>
                    </Center>
                    <HStack
                        cursor="pointer"
                        onClick={handleTeamNav(awayTeam.id)}
                    >
                        <Image src={awayTeam.detail.logo} maxW="40px" />
                        <Text>{awayTeam.detail.name}</Text>
                    </HStack>
                </Flex>
            </Td>
            <Td>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={handleLeagueNav(league._id)}
                >
                    {leagueName}
                </div>
            </Td>
            <Td>{moment(date).format()}</Td>
            <Td>{stadium}</Td>
        </Tr>
    );
}

export default function Schedules({ data: team = {} }) {
    const [state, setState] = useState({
        data: [],
        isLoading: false,
    });

    const getData = async () => {
        try {
            const { _id: id } = team;

            if (id) {
                const { data } = await teamAPIs.getMatches({ id });
                setState((s) => ({ ...s, data }));
            }
        } finally {
            setState((s) => ({ ...s, isLoading: false }));
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (state.isLoading) return <></>;

    return (
        <Table mt={5} variant="simple">
            <Thead bg={"gray.200"}>
                <Tr>
                    <Th textAlign={"center"} p={0}>
                        Trận
                    </Th>
                    <Th>Giải đấu</Th>
                    <Th>Ngày</Th>
                    <Th>Sân đấu</Th>
                </Tr>
            </Thead>
            <Tbody>
                {state.data.map((row, idx) => (
                    <TableRow key={row?._id + idx} data={row} />
                ))}
            </Tbody>
        </Table>
    );
}

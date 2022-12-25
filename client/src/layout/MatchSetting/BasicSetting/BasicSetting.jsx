import React, { useState, useEffect } from 'react';
import {
    HStack,
    Box,
    FormControl,
    FormLabel,
    Select,
    Input,
    RadioGroup,
    Stack,
    Radio,
    Center,
    Button
} from '@chakra-ui/react';
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import matchAPIs from 'apis/match';
import roundAPIs from '@/apis/round';
import { useParams } from 'react-router-dom';

export default function BasicSetting({ teams = [], rounds = [], onChange = () => { } }) {
    const { tableId = null, roundId = null } = useParams();

    const [state, setState] = useState({
        roundId: roundId,
        tableId: tableId,
        date: '',
        stadium: '',
        homeTeam: '',
        awayTeam: '',
        isEnded: 'false',
        isLoading: false
    })

    const [tables, setTables] = useState([]);

    const getTableData = async (roundId) => {
        const { data } = await roundAPIs.getTables(roundId);
        setTables(data);
    }

    const handleChange =
        (name) =>
            ({ target }) => {
                setState((s) => ({
                    ...s,
                    [name]: target.value,
                }));

                if (name === "roundId") getTableData(target.value);
            };

    const handleRadio = (value) => {
        setState(s => ({ ...s, isEnded: value }))
    }

    const handleTeamSelect =
        (team) =>
            ({ target }) => {
                setState((s) => ({
                    ...s,
                    [team]: teams[target.value],
                }));
            }

    const handleSubmit = async () => {
        let res = null;

        if (state.isLoading) return
        try {
            setState(s => ({
                ...s,
                isLoading: true
            }))
            res = await matchAPIs.create(state);
        } finally {
            alert('SUCCESS')
            onChange(res.matchID, res.data);
            setState(s => ({
                ...s,
                isLoading: false
            }))
        }
    }

    useEffect(() => {
        getTableData(roundId);
    }, [])

    // if (state.isLoading) return <ReactFullPageLoading />

    return (
        <Box px={20}>
            <HStack mt={5} spacing={10}>
                <FormControl isRequired>
                    <FormLabel>Đội Nhà</FormLabel>
                    <Select placeholder='Chọn tên đội' onChange={handleTeamSelect('homeTeam')}>
                        {teams.map((team, index) => (<option key={index} value={index}>{team.detail.name}</option>))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Đội Khách</FormLabel>
                    <Select placeholder='Chọn tên đội' onChange={handleTeamSelect('awayTeam')}>
                        {teams.map((team, index) => (<option key={index} value={index}>{team.detail.name}</option>))}
                    </Select>
                </FormControl>
            </HStack>
            {(state.homeTeam && state.homeTeam === state.awayTeam) ? <small style={{ "color": "red" }}>Đội khách và đội nhà phải khác nhau</small> : ""}

            <HStack mt={5} spacing={10}>
                <FormControl>
                    <FormLabel>Vòng đấu</FormLabel>
                    <Select
                        placeholder='Chọn vòng đấu'
                        onChange={handleChange('roundId')}
                        value={state.roundId}
                    >
                        {rounds.map((round, index) => (<option key={index} value={round._id}>{round.name}</option>))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Bảng đấu</FormLabel>
                    <Select
                        placeholder='Chọn bảng đấu'
                        onChange={handleChange('tableId')}
                        disabled={state.roundId ? false : true}
                        value={state.tableId}
                    >
                        {tables.map((table, index) => (<option key={index} value={table._id}>{table.name}</option>))}
                    </Select>
                </FormControl>
            </HStack>
            <HStack mt={5} spacing={10}>
                <FormControl>
                    <FormLabel>Ngày thi đấu</FormLabel>
                    <Input type="date" onChange={handleChange('date')} />
                </FormControl>
                <FormControl>
                    <FormLabel>Sân đấu</FormLabel>
                    <Input onChange={handleChange('stadium')} />
                </FormControl>
            </HStack>
            <FormControl mt={5}>
                <FormLabel>Trạng thái</FormLabel>
                <RadioGroup value={state.isEnded} onChange={handleRadio}>
                    <Stack spacing={5} direction='row'>
                        <Radio size='lg' colorScheme='blue' value='false'>
                            Đang thi đấu
                        </Radio>
                        <Radio size='lg' colorScheme='blue' value='true'>
                            Đã kết thúc
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
            <Center>
                <Button
                    colorScheme='blue'
                    mt={5}
                    onClick={handleSubmit}
                    disabled={state.homeTeam === state.awayTeam ? true : false}
                >
                    Lưu
                </Button>
            </Center>
        </Box>
    )
}

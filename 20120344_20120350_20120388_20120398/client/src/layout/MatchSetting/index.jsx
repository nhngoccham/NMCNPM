import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BasicSetting from './BasicSetting/BasicSetting';
import leagueAPIs from '@/apis/league';
import { STATUS } from '@/constants/index';

export default function MatchSetting() {
    const { leagueId } = useParams();

    const [state, setState] = useState({
        matchID: null,
        teams: [],
        rounds: [],
        tables: [],
        data: null,
        isLoading: false
    })

    const getData = async () => {
        if (state.isLoading) return;

        setState(s => ({
            ...s,
            isLoading: true
        }))

        try {
            const { data: league } = await leagueAPIs.getById(leagueId);
            const teams = league.teams.filter(team => team.status === STATUS.ACCEPTED);
            const { data: rounds } = await leagueAPIs.getRounds(leagueId);

            // const data = await matchAPIs.getById(state.matchID)
            setState(s => ({
                ...s,
                teams: teams,
                rounds: rounds,
                // data: data
            }))

        } finally {
            setState(s => ({
                ...s,
                isLoading: false
            }))
        }

    }

    const handleOnCreated = (matchID, data) => {
        setState(s => ({ ...s, matchID, data }));
        getData();
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box my={8}>
            <Heading fontSize={'3xl'} textAlign={'center'}>
                Thiết lập trận đấu
            </Heading>
            <BasicSetting teams={state.teams} rounds={state.rounds} onChange={handleOnCreated} />
        </Box>
    )
}

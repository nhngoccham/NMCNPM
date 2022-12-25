import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import MatchSchedule from './MatchSchedule';
import Info from './Info/index';
import Rankings from './Rankings/index';
import leagueAPIs from 'apis/league';
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import Teams from './Teams/index';
import { useHistory } from 'react-router-dom';

export default function LeagueDetail() {
    const { id,tab="intro" } = useParams();
    const history = useHistory()
    const data = {
        'intro':0,
        'rankings':1,
        'teams':2,
        'schedule':3
    }
    const [state, setState] = useState({
        data: {},
        isLoading: false
    });


    const getData = async () => {
        setState(s => ({
            ...s,
            isLoading: true
        }))
        try {
            const { data } = await leagueAPIs.getById(id);
            setState(s => ({
                ...s,
                data: data
            }))

        } finally {
            setState(s => ({
                ...s,
                isLoading: false
            }))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleOnChange = () => {
        getData();
    }

    // if (state.isLoading)
    //     return <ReactFullPageLoading />

    const { isAdmin } = state.data;
    const handleTabChange = (index) => {
        const tab = Object.keys(data).find(key => data[key] === index)
        history.push(`/leagues/${id}/${tab}`)
    }

    return (
        <Box my={8}>
            <Tabs defaultIndex={data[tab]} onChange={handleTabChange} isFitted variant='enclosed'>
                <TabList  mb='1em'>
                    <Tab _focus={{ boxShadow: "none", }}>Thông tin giải đấu</Tab>
                    <Tab _focus={{ boxShadow: "none", }}>Bảng xếp hạng</Tab>
                    <Tab _focus={{ boxShadow: "none", }}>Danh sách đội</Tab>
                    <Tab _focus={{ boxShadow: "none", }}>Lịch thi đấu</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Info data={state.data} />
                    </TabPanel>
                    <TabPanel>
                        <Rankings league={state.data} />
                    </TabPanel>
                    <TabPanel>
                        <Teams teams={state.data.teams} isAdmin={isAdmin} onChange={handleOnChange} />
                    </TabPanel>
                    <TabPanel px={10}>
                        <MatchSchedule data={state.data} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

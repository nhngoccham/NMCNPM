import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Intro from './Intro/index';
import Members from './Members/index';
import Schedules from './MatchSchedule';
import teamAPIs from '@/apis/team';
import { useHistory } from 'react-router';
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import { useParams } from 'react-router';

export default function DoiBong() {
    const { id,tab="intro" } = useParams()
    const history = useHistory()
    const data = {
        'intro':0,
        'members':1,
        'schedule':2,
    }
    const [state, setState] = React.useState({
        data: {},
        isLoading: false
    })

    const getData = async () => {
        if (state.isLoading) return

        setState(s => ({ ...s, isLoading: true }))
        try {
            const { data } = await teamAPIs.getById({ id })
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

    React.useEffect(() => {
        getData()

    }, [id])

    const handleReload = () => {
        history.go(0)
    }
    const handleTabChange = (index) => {
        const tab = Object.keys(data).find(key => data[key] === index)
        history.push(`/teams/${id}/${tab}`)
    }

    // if (state.isLoading) return <ReactFullPageLoading />

    return (
        <Box my={8}>
            <Tabs onChange={handleTabChange} defaultIndex={data[tab]} isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _focus={{ boxShadow: "none", }}>Giới thiệu</Tab>
                    <Tab _focus={{ boxShadow: "none", }}>Thành viên</Tab>
                    <Tab _focus={{ boxShadow: "none", }}>Lịch thi đấu</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Intro data={state.data} />
                    </TabPanel>
                    <TabPanel>
                        <Members onChange={handleReload} data={state.data} />
                    </TabPanel>
                    <TabPanel px={10}>
                        <Schedules data={state.data} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

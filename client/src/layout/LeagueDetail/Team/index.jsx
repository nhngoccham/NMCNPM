import React from 'react';
import { Stack, Text, Button, Image, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { STATUS } from '@/constants/index';
import leagueAPIs from '@/apis/league';
import { useHistory } from 'react-router';
export default function SubmissionTeam({ data, league = {} }) {
    const history = useHistory()
    const { id = "", detail = {} } = data || {}
    const { logo, name } = detail || {}
    const isAdmin = league?.isAdmin || false
    const leagueId = league?._id || ""
    const handle = (status) => async () => {
        const data = {
            status: status,
            teamId: id
        }
        await leagueAPIs.updateTeam(leagueId, data)
        history.go(0)
    }
    return (
        <Link href={`/teams/${id}/intro`}>
            <Stack p="4" boxShadow="lg" direction="row" borderRadius="sm" align={'center'}>
                <Image src={logo} w={'40px'} mr={4} />
                <Text fontWeight="semibold" fontSize='lg'>{name}</Text>
                <Spacer />
                {isAdmin &&
                    <>
                        <Button onClick={handle(STATUS.ACCEPTED)} colorScheme="blue" flex={'end'}>Duyệt</Button>
                        <Button onClick={handle(STATUS.REJECTED)} colorScheme="red" flex={'end'}>Từ chối</Button>
                    </>
                }
            </Stack>
        </Link>
    );
}
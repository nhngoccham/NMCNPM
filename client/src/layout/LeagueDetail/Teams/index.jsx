import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Item from '../InfoCard';
import { STATUS } from '@/constants/index';

export default function Teams({ teams = [], isAdmin = null, onChange = () => { } }) {
    return (
        <SimpleGrid columns={4} my={6} spacing="20px">
            {teams
                .filter(team => team.status === STATUS.ACCEPTED)
                .map((team, idx) =>
                    <Item
                        data={team.detail}
                        isPayed={team.isPayed}
                        isAdmin={isAdmin}
                        key={idx}
                        onChange={onChange}
                    />)
            }
        </SimpleGrid>
    )
}

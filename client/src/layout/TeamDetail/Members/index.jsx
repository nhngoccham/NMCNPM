import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import AddUpdateMember from '../AddUpdateMember/index';
import MemberItem from '../MemberItem'

export default function Members({ data, onChange = () => { } }) {
    const { members = [], isAdmin = false } = data
    return (
        <>
            {isAdmin && <AddUpdateMember onChange={onChange} data={data}>Thêm thành viên</AddUpdateMember>}
            <SimpleGrid columns={4} my={6} spacing="20px">
                {members.map((member, idx) => <MemberItem onChange={onChange} data={data} member={member} key={idx} />)}
            </SimpleGrid>
        </>
    )
}

import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Box,
    FormControl,
    FormLabel,
    Select,
    Input,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import matchAPIs from '@/apis/match';
import { useHistory } from "react-router";

export default function DetailSetting({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory()
    const [state, setState] = useState({
        type: null,
        minute: null,
        player: null,
    })

    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);

    const handeOnChange =
        (name) =>
            ({ target }) => {
                if (name === 'player')
                    setState(s => ({ ...s, player: members[target.value] }));
                else
                    setState(s => ({ ...s, [name]: target.value }));
            }

    const handleTeamSelect =
        ({ target }) => {
            setTeam(target.value);
            setMembers([])

            if (target.value === 'awayTeam')
                setMembers(data.awayTeam.members);
            if (target.value === 'homeTeam')
                setMembers(data.homeTeam.members);
        }

    const handleSubmit = async () => {
        await matchAPIs.createDetail(data._id, state);
        onClose();
        console.log('history.go');
        history.go(0);
    }

    return (
        <>
            <Button colorScheme='teal' variant='outline' onClick={onOpen}>Thêm chi tiết</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thiết lập trận đấu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <FormControl mb={4}>
                                <FormLabel>Loại</FormLabel>
                                <Select placeholder='Chọn loại' value={state.type} onChange={handeOnChange('type')}>
                                    <option value={'goal'}>Ghi bàn</option>
                                    <option value={'ownGoal'}>Phản lưới nhà</option>
                                    <option value={'yellowCard'}>Thẻ vàng</option>
                                    <option value={'redCard'}>Thẻ đỏ</option>
                                    <option value={'penalty'}>Đá phạt</option>
                                </Select>
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Phút</FormLabel>
                                <Input type='number' value={state.minute} onChange={handeOnChange('minute')} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Đội bóng</FormLabel>
                                <Select onChange={handleTeamSelect} value={team} placeholder="Chọn đội bóng">
                                    <option value={'awayTeam'}>{data.awayTeam.detail.name}</option>
                                    <option value={'homeTeam'}>{data.homeTeam.detail.name}</option>
                                </Select>
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Cầu thủ</FormLabel>
                                <Select placeholder="Chọn cầu thủ"
                                    disabled={team ? false : true}
                                    onChange={handeOnChange('player')}
                                >
                                    {members.map((member, idx) => <option value={idx}>{member.name}</option>)}
                                </Select>
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Lưu
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

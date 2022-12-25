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
    Switch,
    Center,
    Grid,
    GridItem,
    Text,
    Input,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import DetailSetting from '../DetailSetting/DetailSetting';
import matchAPIs from '@/apis/match';
import { useHistory } from "react-router";


export default function MatchScore({ data }) {
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [state, setState] = useState({
        homeTeamScore: data.homeTeam.goal,
        homeTeamPenalty: data.homeTeam.penalty,
        awayTeamScore: data.awayTeam.goal,
        awayTeamPenalty: data.awayTeam.penalty,
        highlight: data.highlight,
        isEnded: data.isEnded
    })

    const handeOnChange =
        (name) =>
            ({ target }) => {
                if (name === 'isEnded')
                    setState(s => ({ ...s, [name]: target.checked }));
                else
                    setState(s => ({ ...s, [name]: target.value }));
            }

    const handleSubmit = async () => {
        let { homeTeam, awayTeam } = data;

        homeTeam.goal = state.homeTeamScore;
        homeTeam.penalty = state.homeTeamPenalty;

        awayTeam.goal = state.awayTeamScore;
        awayTeam.penalty = state.awayTeamPenalty;

        await matchAPIs.update(data._id, { homeTeam, awayTeam });
        await matchAPIs.createEnd(data._id, { isEnded: state.isEnded });
        await matchAPIs.createHighlight(data._id, { highlight: state.highlight });

        onClose();
        history.go(0);
    }

    return (
        <>
            <Button colorScheme='teal' variant='outline' onClick={onOpen}>Thêm thông số</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thiết lập trận đấu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Grid gap={6} templateColumns='repeat(5, 1fr)'>
                                <GridItem colSpan={2} textAlign={"center"}>{data.homeTeam.detail.name}</GridItem>
                                <GridItem />
                                <GridItem colSpan={2} textAlign={"center"}>{data.awayTeam.detail.name}</GridItem>
                                <GridItem colSpan={2}>
                                    <Input type='number' value={state.homeTeamScore} onChange={handeOnChange('homeTeamScore')} />
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text textAlign={"center"}>Tỷ số</Text>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Input type='number' value={state.awayTeamScore} onChange={handeOnChange('awayTeamScore')} />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Input type='number' value={state.homeTeamPenalty} onChange={handeOnChange('homeTeamPenalty')} />
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text textAlign={"center"}>Penalty</Text>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Input type='number' value={state.awayTeamPenalty} onChange={handeOnChange('awayTeamPenalty')} />
                                </GridItem>
                            </Grid>
                            <FormControl mt={5}>
                                <FormLabel mb='0'>
                                    Highlight link:
                                </FormLabel>
                                <Input
                                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    value={state.highlight}
                                    onChange={handeOnChange('highlight')}
                                />
                            </FormControl>
                            <FormControl mt={5} display='flex' alignItems='center'>
                                <FormLabel mb='0'>
                                    Trận đấu đã kết thúc:
                                </FormLabel>
                                <Switch
                                    colorScheme='teal'
                                    size='lg'
                                    onChange={handeOnChange('isEnded')}
                                    defaultChecked={state.isEnded ? true : false} />
                            </FormControl>
                            <Center mt={5}>
                                <DetailSetting data={data} />
                            </Center>
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

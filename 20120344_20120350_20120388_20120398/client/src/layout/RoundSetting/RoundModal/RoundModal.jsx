import React from 'react';
import roundAPIs from '@/apis/round';
import { ROUND_TYPE } from '@/constants/index';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function RoundModal({ leagueId, onChange = () => { } }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [state, setState] = useState({
        leagueId: leagueId,
        type: "",
        name: "",
    })

    const handleOnChange =
        (name) =>
            ({ target }) => {
                setState(s => ({ ...s, [name]: target.value }))
            }

    const handleOnSubmit = async () => {
        try {
            await roundAPIs.create(state);
        } finally {
            onClose();
            onChange();
        }
    }

    return (
        <>
            <Button
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                width={'50%'}
                ml='auto'
                onClick={onOpen}>
                Thêm vòng đấu
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thông tin vòng đấu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={5} isRequired>
                            <FormLabel>Tên vòng đấu</FormLabel>
                            <Input placeholder='Tên vòng đấu' onChange={handleOnChange('name')} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Thể thức thi đấu</FormLabel>
                            <Select placeholder='Chọn thể thức thi đấu' onChange={handleOnChange('type')}>
                                <option>{ROUND_TYPE.TABLE}</option>
                                <option>{ROUND_TYPE.ELIMINATION}</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleOnSubmit}>
                            Lưu
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
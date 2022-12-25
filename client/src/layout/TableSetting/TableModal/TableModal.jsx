import tableAPIs from '@/apis/table';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
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

export default function TableModal({ roundId, isDisabled, onChange = () => { } }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [state, setState] = useState({
        name: "",
    })

    const handleOnChange =
        (name) =>
            ({ target }) => {
                setState(s => ({ ...s, [name]: target.value }))
            }

    const handleOnSubmit = async () => {
        try {
            const data = {
                name: state.name,
                roundId
            }
            await tableAPIs.create(data);
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
                disabled={(roundId && isDisabled) ? false : true}
                onClick={onOpen}>
                Thêm bảng đấu
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thông tin bảng đấu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={5} isRequired>
                            <FormLabel>Tên bảng đấu</FormLabel>
                            <Input placeholder='Tên bảng đấu' onChange={handleOnChange('name')} />
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
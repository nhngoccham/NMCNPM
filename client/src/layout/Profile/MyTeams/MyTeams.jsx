import React from 'react';
import {
    InputGroup,
    Input,
    InputRightElement,
    Button,
    HStack,
    Box,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
    Image
} from '@chakra-ui/react';
import InfoCard from '@/components/InfoCard/index';
import { DatePicker } from '@orange_digital/chakra-datepicker';
import ImagePicker from '@/components/ImagePicker/index';
import teamAPIs from '@/apis/team';
import firebaseAPIs from '@/apis/firebase';
import { useHistory } from 'react-router';
// import ReactFullPageLoading from "react-fullpage-custom-loader";

export default function MyTeams() {
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [state, setState] = React.useState({
        data: [],
        name: "",
        logo: {},
        description: "",
        foundedDate: new Date(),
        isLoading: true
    })
    const getData = async () => {
        try {
            const { data } = await teamAPIs.getMyTeams()
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
    }, [])
    const handleTextChange = (name) => ({ target }) => {
        setState(s => ({
            ...s,
            [name]: target.value
        }))
    }
    const handleDateChange = (date) => {
        setState(s => ({
            ...s,
            foundedDate: date
        }))
    }
    const handlePick = (image) => {
        setState(s => ({
            ...s,
            logo: image[0]
        }))
    }


    const handleCreate = async () => {
        if (state.isLoading) return

        try {
            setState(s => ({
                ...s,
                isLoading: true
            }))
            let logo = ""
            if (state.logo !== undefined && Object.keys(state.logo).length !== 0) {
                logo = await firebaseAPIs.uploadFile(state.logo)
            }
            const { data } = await teamAPIs.create({ name: state.name, logo: logo, description: state.description, foundedDate: state.foundedDate })
            const { _id: id } = data
            history.push(`/teams/${id}/intro`)
        } finally {
            setState(s => ({
                ...s,
                isLoading: false
            }))
        }
    }

    // if (state.isLoading) return <ReactFullPageLoading />

    return (
        <Box p={10}>
            <HStack spacing="30px">
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={'text'}
                        placeholder='Nhập tên đội bóng'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' bg={'blue.300'} _hover={{ bg: 'blue.200' }}>
                            Tìm
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button bg={'blue.300'} _hover={{ bg: 'blue.200' }} onClick={onOpen}>Tạo câu lạc bộ</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Tạo câu lạc bộ</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id='clubName' isRequired>
                                <FormLabel>Tên câu lạc bộ</FormLabel>
                                <Input value={state.name} onChange={handleTextChange('name')} />
                            </FormControl>
                            <FormControl id='clubLogo' isRequired>
                                <FormLabel>Mô tả</FormLabel>
                                <Textarea value={state.description} onChange={handleTextChange('description')} />
                            </FormControl>
                            <FormControl id='foundDate' isRequired>
                                <FormLabel>Ngày thành lập</FormLabel>
                                <DatePicker onChange={handleDateChange} initialValue={new Date()} />
                            </FormControl>
                            <FormControl id='logo' isRequired>
                                <FormLabel>Logo</FormLabel>
                                <ImagePicker onChange={handlePick} >
                                    {Object.keys(state.logo).length !== 0 && <Image
                                        src={state.logo.url}
                                        h={'100%'}
                                        layout={'fit'}
                                    />}
                                </ImagePicker>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCreate} variant='outline'>Thêm</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </HStack>
            <SimpleGrid columns={4} my={6} spacing="20px">
                {state.data.map((team, idx) => <InfoCard data={team} key={idx} />)}
            </SimpleGrid>
        </Box>
    )
}

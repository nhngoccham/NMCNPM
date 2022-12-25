import React from "react";
import {
    Input,
    Button,
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
    Image,
    Flex,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { DatePicker } from "@orange_digital/chakra-datepicker/dist/DatePicker";
import ImagePicker from "@/components/ImagePicker";
import teamAPIs from "@/apis/team";
import firebaseAPIs from "@/apis/firebase";
const AddUpdateMember = ({
    children,
    data,
    member = {},
    onChange = () => {},
}) => {
    const { _id: id } = data;
    const { isOpen, onOpen, onClose } = useDisclosure();
    // * - name: Tên thành viên
    // * - birthday: Ngày sinh
    // * - number: Số áo
    // * - position: Vị trí
    // * - avatar: Đại diện
    // * - updatedAt: Ngàu cập nhật gần nhất
    const [state, setState] = React.useState({
        name: "",
        birthday: new Date(),
        number: 0,
        position: "",
        isLoading: false,
        ...member,
        avatar: member.avatar ? { url: member.avatar } : {},
    });

    const handleTextChange =
        (name) =>
        ({ target }) => {
            setState((s) => ({
                ...s,
                [name]: target.value,
            }));
        };
    const handleDateChange = (date) => {
        setState((s) => ({
            ...s,
            birthday: date,
        }));
    };
    const handlePick = (image) => {
        setState((s) => ({
            ...s,
            avatar: image[0],
        }));
    };

    const handleAdd = async () => {
        if (state.isLoading) return;
        try {
            setState((s) => ({
                ...s,
                isLoading: true,
            }));

            let avatar = state.avatar.url;
            if (
                state.avatar !== undefined &&
                Object.keys(state.avatar).length !== 0 &&
                state.avatar.url !== member.avatar
            ) {
                avatar = await firebaseAPIs.uploadFile(state.avatar);
            }

            const params = {
                name: state.name,
                birthday: state.birthday,
                avatar,
                number: state.number,
                position: state.position,
            };
            if (Object.keys(member).length === 0)
                await teamAPIs.addMember({ id, ...params });
            else {
                await teamAPIs.updateMember({ id, member, newMember: params });
            }
            onClose();
        } finally {
            onChange();
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    };

    const handleDelete = async () => {
        if (state.isLoading) return;
        try {
            setState((s) => ({
                ...s,
                isLoading: true,
            }));
            await teamAPIs.deleteMember({ id, member });
            onClose();
        } finally {
            onChange();
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    };
    return (
        <Flex>
            <Button onClick={onOpen}>{children}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thêm thành viên</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="clubName" isRequired>
                            <FormLabel>Tên thành viên</FormLabel>
                            <Input
                                value={state.name}
                                onChange={handleTextChange("name")}
                            />
                        </FormControl>
                        <FormControl id="clubLogo" isRequired>
                            <FormLabel>Vị trí</FormLabel>
                            <Input
                                value={state.position}
                                onChange={handleTextChange("position")}
                            />
                        </FormControl>
                        <FormControl id="clubLogo" isRequired>
                            <FormLabel>Số áo</FormLabel>
                            <Input
                                value={state.number}
                                onChange={handleTextChange("number")}
                            />
                        </FormControl>
                        <FormControl id="foundDate" isRequired>
                            <FormLabel>Ngày sinh</FormLabel>
                            <DatePicker
                                onChange={handleDateChange}
                                initialValue={new Date()}
                            />
                        </FormControl>
                        <FormControl id="logo" isRequired>
                            <FormLabel>Ảnh đại diện</FormLabel>
                            <ImagePicker onChange={handlePick}>
                                {Object.keys(state.avatar).length !== 0 && (
                                    <Image
                                        src={state.avatar.url}
                                        h={"100%"}
                                        layout={"fit"}
                                    />
                                )}
                            </ImagePicker>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {Object.keys(member).length === 0 ? (
                            <Button
                                disabled={state.isLoading}
                                colorScheme="blue"
                                mr={3}
                                onClick={handleAdd}
                            >
                                Thêm
                            </Button>
                        ) : (
                            <>
                                <Button
                                    disabled={state.isLoading}
                                    colorScheme="red"
                                    mr={3}
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </Button>
                                <Button
                                    disabled={state.isLoading}
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={handleAdd}
                                >
                                    Cập nhật
                                </Button>
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default AddUpdateMember;

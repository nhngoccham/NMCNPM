import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

export default function ChangePassword({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                variant="outline"
                minW="20"
                mx={4}
                leftIcon={<HiPencilAlt />}
                onClick={onOpen}
            >
                {children}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="oldPassword" isRequired>
                            <FormLabel>Nhập mật khẩu cũ</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl id="newPassword" isRequired>
                            <FormLabel>Mật khẩu mới</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl id="newPasswordRetype" isRequired>
                            <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                            <Input />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline">Thay đổi</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

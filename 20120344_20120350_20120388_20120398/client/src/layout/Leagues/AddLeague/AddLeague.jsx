import React, { useState } from "react";
import {
    Input,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Select,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import ImagePicker from "@/components/ImagePicker/index";
import leagueAPIs from "apis/league";
import firebaseAPIs from "apis/firebase";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function AddLeague({ children, data, onChange = () => {} }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const auth = useSelector((state) => state?.userReducer || {});
    const [state, setState] = useState({
        name: "",
        logo: {},
        startDate: "",
        endDate: "",
        registerDate: "",
        numTeamLimit: "",
        minNumMember: "",
        maxNumMember: "",
        minAgeMember: "",
        maxAgeMember: "",
        winScore: "",
        equalScore: "",
        loseScore: "",
        gender: "",
        isLoading: false,
    });

    const handleChange =
        (name) =>
        ({ target }) => {
            setState((s) => ({
                ...s,
                [name]: target.value,
            }));
        };

    const handleImagePicker = (imgs) => {
        setState((s) => ({
            ...s,
            logo: imgs[0],
        }));
    };

    const handleSubmit = async () => {
        leagueAPIs.create(state);
        if (state.isLoading) return;
        try {
            setState((s) => ({
                ...s,
                isLoading: true,
            }));

            let logo = "";
            if (
                state.logo !== undefined &&
                Object.keys(state.logo).length !== 0
            ) {
                logo = await firebaseAPIs.uploadFile(state.logo);
            }
            // console.log('logo: ', logo)
            const { data } = await leagueAPIs.create({ ...state, logo });
            const { _id: id } = data;
            history.push(`/leagues/${id}/intro`);
            onClose();
        } finally {
            onChange();
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    };

    const isDisabled = () => {
        return (
            !state.name ||
            !state.startDate ||
            !state.endDate ||
            !state.registerDate ||
            !state.winScore ||
            !state.equalScore ||
            !state.loseScore ||
            !state.numTeamLimit ||
            !state.gender ||
            !state.minAgeMember ||
            !state.maxAgeMember ||
            !state.minNumMember ||
            !state.maxNumMember
        );
    };

    return (
        <>
            {auth.accessToken && <Button
                bg={"blue.300"}
                _hover={{ bg: "blue.200" }}
                onClick={onOpen}
            >
                T???o gi???i ?????u
            </Button>}
            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{children}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack>
                            <FormControl flex={2} id="leagueName" isRequired>
                                <FormLabel>T??n gi???i ?????u</FormLabel>
                                <Input
                                    value={state.name}
                                    onChange={handleChange("name")}
                                />
                            </FormControl>
                            <FormControl mt={2} flex={1} isRequired>
                                <FormLabel>Logo gi???i ?????u</FormLabel>
                                <ImagePicker onChange={handleImagePicker}>
                                    {state.logo &&
                                        Object.keys(state.logo).length !==
                                            0 && (
                                            <Image
                                                src={state.logo.url}
                                                height={"150px"}
                                                layout={"fit"}
                                            />
                                        )}
                                </ImagePicker>
                            </FormControl>
                        </HStack>
                        <HStack my={4}>
                            <FormControl id="startDate" isRequired>
                                <FormLabel>Ng??y b???t ?????u</FormLabel>
                                <Input
                                    type="date"
                                    value={state.startDate}
                                    onChange={handleChange("startDate")}
                                />
                            </FormControl>
                            <FormControl id="endDate" isRequired>
                                <FormLabel>Ng??y k???t th??c</FormLabel>
                                <Input
                                    type="date"
                                    value={state.endDate}
                                    onChange={handleChange("endDate")}
                                />
                            </FormControl>
                            <FormControl id="registerDate" isRequired>
                                <FormLabel>H???n ????ng k??</FormLabel>
                                <Input
                                    type="date"
                                    value={state.registerDate}
                                    onChange={handleChange("registerDate")}
                                />
                            </FormControl>
                        </HStack>
                        <HStack my={4}>
                            <FormControl id="winScore" isRequired>
                                <FormLabel>??i???m th???ng</FormLabel>
                                <Input
                                    type="number"
                                    value={state.winScore}
                                    onChange={handleChange("winScore")}
                                />
                            </FormControl>
                            <FormControl id="equalScore" isRequired>
                                <FormLabel>??i???m h??a</FormLabel>
                                <Input
                                    type="number"
                                    value={state.equalScore}
                                    onChange={handleChange("equalScore")}
                                />
                            </FormControl>
                            <FormControl id="loseScore" isRequired>
                                <FormLabel>??i???m thua</FormLabel>
                                <Input
                                    type="number"
                                    value={state.loseScore}
                                    onChange={handleChange("loseScore")}
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl flex={1} id="numTeamLimit" isRequired>
                                <FormLabel>Gi???i h???n s??? ?????i</FormLabel>
                                <Input
                                    type="number"
                                    value={state.numTeamLimit}
                                    onChange={handleChange("numTeamLimit")}
                                />
                            </FormControl>
                            <FormControl flex={1} id="gender" isRequired>
                                <FormLabel>Gi???i t??nh</FormLabel>
                                <Select
                                    placeholder="Select Gender"
                                    onChange={handleChange("gender")}
                                >
                                    <option>Nam</option>
                                    <option>N???</option>
                                </Select>
                            </FormControl>
                        </HStack>
                        <HStack mt={6}>
                            <FormControl id="minNumMember" isRequired>
                                <FormLabel>S??? th??nh vi??n ch??nh th???c</FormLabel>
                                <Input
                                    type="number"
                                    value={state.minNumMember}
                                    onChange={handleChange("minNumMember")}
                                />
                            </FormControl>
                            <FormControl id="maxNumMember" isRequired>
                                <FormLabel>
                                    S??? th??nh vi??n d??? b??? (t???i ??a)
                                </FormLabel>
                                <Input
                                    type="number"
                                    value={state.maxNumMember}
                                    onChange={handleChange("maxNumMember")}
                                />
                            </FormControl>
                        </HStack>
                        <HStack mt={6}>
                            <FormControl id="minAgeMember" isRequired>
                                <FormLabel>S??? tu???i nh??? nh???t</FormLabel>
                                <Input
                                    type="number"
                                    value={state.minAgeMember}
                                    onChange={handleChange("minAgeMember")}
                                />
                            </FormControl>
                            <FormControl id="maxAgeMember" isRequired>
                                <FormLabel>S??? tu???i l???n nh???t</FormLabel>
                                <Input
                                    type="number"
                                    value={state.maxAgeMember}
                                    onChange={handleChange("maxAgeMember")}
                                />
                            </FormControl>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            disabled={isDisabled()}
                            colorScheme="blue"
                            mx={"auto"}
                            onClick={handleSubmit}
                        >
                            T???o
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

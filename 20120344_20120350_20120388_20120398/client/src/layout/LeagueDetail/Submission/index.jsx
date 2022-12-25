import React from "react";
import {
    Button,
    Stack,
    Text,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Checkbox,
    Image,
    Flex,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { MdAssignment } from "react-icons/md";
import teamAPIs from "@/apis/team";
import { STATUS } from "@/constants/index";
import { useHistory } from "react-router";
import leagueAPIs from "@/apis/league";
const Submission = ({ children, data = {} }) => {
    const history = useHistory();
    const { _id: id } = data;
    const { isOpen, onOpen, onClose } = useDisclosure();
    // * - name: Tên thành viên
    // * - birthday: Ngày sinh
    // * - number: Số áo
    // * - position: Vị trí
    // * - avatar: Đại diện
    // * - updatedAt: Ngàu cập nhật gần nhất
    const [state, setState] = React.useState({
        teams: [],
        team: {},
        members: [],
        isLoading: true,
    });

    const getData = async () => {
        try {
            const { data = [] } = await teamAPIs.getMyTeams();
            setState((s) => ({
                ...s,
                teams: data,
            }));
        } finally {
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
        }
    };
    React.useEffect(() => {
        getData();
    }, []);

    const handleSelectTeam = (team) => () => {
        setState((s) => ({
            ...s,
            team,
        }));
    };
    const handleSelectMember = (member) => (isChecked) => {
        let members = state.members || [];

        if (isChecked) {
            members = [...members, member];
        } else {
            members = members.filter((item) => item === member);
        }
        setState((s) => ({
            ...s,
            members: members,
        }));
    };

    const handleSubmit = async () => {
        if (state.isLoading) return;
        try {
            setState((s) => ({
                ...s,
                isLoading: true,
            }));
            const data = {
                id: state.team?._id || "",
                members: state.members || [],
                status: STATUS.PENDING,
                isPayed: false,
            };

            await leagueAPIs.createTeam(id, data);
            onClose();
        } finally {
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
            history.go(0);
        }
    };
    const members = state.team?.members || [];
    const teams = state.teams || [];
    const renderItem = (item, idx) => {
        const isChecked = state.members.findIndex((i) => i === item) > -1;
        return (
            <MemberItem
                onChange={handleSelectMember(item)}
                key={JSON.stringify({ item, idx })}
                item={item}
                isChecked={isChecked}
            />
        );
    };

    return (
        <Flex>
            <Button
                leftIcon={<MdAssignment />}
                m={6}
                colorScheme="blue"
                variant="solid"
                onClick={onOpen}
            >
                {children}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {state.team?.name || "Chọn đội bóng"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {Object.keys(state.team).length === 0 ? (
                            <div>
                                {teams.map((item, idx) => (
                                    <>
                                        <Stack
                                            key={JSON.stringify({ item, idx })}
                                            p="4"
                                            boxShadow="lg"
                                            direction="row"
                                            borderRadius="sm"
                                            align={"center"}
                                        >
                                            <Image
                                                src={item.logo}
                                                w={"40px"}
                                                mr={4}
                                            />
                                            <Text
                                                fontWeight="semibold"
                                                fontSize="lg"
                                            >
                                                {item.name}
                                            </Text>
                                            <Spacer />
                                            <Button
                                                disabled={
                                                    !item?.members?.length
                                                }
                                                onClick={handleSelectTeam(item)}
                                                colorScheme="blue"
                                                flex={"end"}
                                            >
                                                Chọn
                                            </Button>
                                        </Stack>
                                        {!item?.members?.length && (
                                            <Alert status="error">
                                                <AlertIcon />
                                                Đội bóng phải có thành viên!
                                            </Alert>
                                        )}
                                    </>
                                ))}
                            </div>
                        ) : (
                            <div>{members.map(renderItem)}</div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {Object.keys(state.team).length !== 0 && (
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={handleSubmit}
                            >
                                Nộp
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

const MemberItem = ({ item, isChecked = false, onChange = () => {} }) => {
    const handleChange = ({ target }) => {
        onChange(target.checked);
    };
    return (
        <Stack
            p="4"
            boxShadow="lg"
            direction="row"
            borderRadius="sm"
            align={"center"}
        >
            <Image src={item.logo} w={"40px"} mr={4} />
            <Text fontWeight="semibold" fontSize="lg">
                {item.name}
            </Text>
            <Spacer />
            <Checkbox
                onChange={handleChange}
                isChecked={isChecked}
                colorScheme="green"
                defaultIsChecked
            ></Checkbox>
        </Stack>
    );
};

export default Submission;

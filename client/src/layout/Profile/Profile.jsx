import {
    Box,
    Button,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    TabList,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { Card } from "./Card/Card";
import { CardContent } from "./CardContent/CardContent";
import { CardHeader } from "./CardHeader/CardHeader";
import { Property } from "./Property/Property";
import { useDispatch, useSelector } from "react-redux";
import { actSetUserData } from "@/redux/actions/userActions";
import { useHistory } from "react-router";
import ChangePassword from "./ChangePassword/ChangePassword";
import MyTeams from "./MyTeams/MyTeams";
import MyLeagues from "./MyLeagues/MyLeagues";

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const history = useHistory();
    const handleLogOut = () => {
        dispatch(actSetUserData({ user: {}, accessToken: "" }));
        localStorage.removeItem("@access_token_flm");
        localStorage.removeItem("@refresh_token_flm");
        history.push("/");
    };

    return (
        <>
            <Tabs isFitted variant="enclosed" mt={8}>
                <TabList mb="1em">
                    <Tab _focus={{ boxShadow: "none" }}>Thông tin cá nhân</Tab>
                    <Tab _focus={{ boxShadow: "none" }}>Giải đấu của tôi</Tab>
                    <Tab _focus={{ boxShadow: "none" }}>Đội bóng của tôi</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box
                            as="section"
                            py={12}
                            px={{
                                md: "8",
                            }}
                        >
                            <Card maxW="3xl" boxShadow="2xl" mx="auto">
                                <CardHeader
                                    title="Account Info"
                                    action={
                                        <Box>
                                            <ChangePassword>
                                                Đổi mật khẩu
                                            </ChangePassword>
                                            <Button
                                                bg="red.500"
                                                color="gray.50"
                                                minW="20"
                                                leftIcon={<FaSignOutAlt />}
                                                onClick={handleLogOut}
                                            >
                                                Đăng xuất
                                            </Button>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Property
                                        label="Username"
                                        value={`${user.username}`}
                                    />
                                    <Property
                                        label="Email"
                                        value={`${user.email}`}
                                    />
                                    <Property
                                        label="Role"
                                        value="Ban tổ chức"
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <MyLeagues />
                    </TabPanel>
                    <TabPanel>
                        <MyTeams />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

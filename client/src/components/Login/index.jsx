import React from "react";
import {
    Flex,
    Box,
    Button,
    Stack,
    Link,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useDispatch } from "react-redux";
import { actSetUserData } from "@/redux/actions/userActions";
import { config } from "@/config/index";
import authAPIs from "@/apis/auth";
import { useHistory } from "react-router-dom";
import SignIn from './SignIn'
import SignUp from './SignUp'
// import ReactFullPageLoading from "react-fullpage-custom-loader";

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = React.useState({
        action: 'login',
        isLoading: false,
    });


    const handleLogInSuccess = (res) => {
        const { accessToken, refreshToken, user } = res
        dispatch(actSetUserData({ user, accessToken }));
        localStorage.setItem("@access_token_flm", accessToken);
        localStorage.setItem("@refresh_token_flm", refreshToken);
        history.push("/")
    };


    const handleLogInGoogle = ({ accessToken }) => {
        setState(s => ({
            ...s,
            isLoading: true
        }))
        authAPIs
            .logInWithGoogle({ token: accessToken })
            .then((res) => {
                handleLogInSuccess(res);
                setState(s => ({
                    ...s,
                    isLoading: false
                }))
            })
            .catch((e) => {
                console.log(e);
                setState(s => ({
                    ...s,
                    isLoading: false
                }))
            });
    };
    const handleLogInFacebook = ({ accessToken }) => {
        setState(s => ({
            ...s,
            isLoading: true
        }))
        authAPIs
            .logInWithFacebook(accessToken)
            .then((res) => {
                handleLogInSuccess(res);
                setState(s => ({
                    ...s,
                    isLoading: false
                }))
            })
            .catch((e) => {
                setState(s => ({
                    ...s,
                    isLoading: false
                }))
            })

    };


    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            {/* {state.isLoading && <ReactFullPageLoading />} */}
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        {state.action === 'login' ?
                            <>
                                <SignIn onSuccess={handleLogInSuccess} />
                                <Button onClick={() => setState(s => ({ ...s, action: 'signup' }))}>Đăng ký ngay?</Button>
                            </>
                            : <>
                                <SignUp onSuccess={handleLogInSuccess} />
                                <Button onClick={() => setState(s => ({ ...s, action: 'login' }))}>Quay lại đăng nhập</Button>
                            </>
                        }

                        {/* <Flex flex={1} flexDirection="row" alignSelf='center' >
                            <GoogleLogin
                                clientId={config.GOOG_API_KEY}
                                onSuccess={handleLogInGoogle}
                                render={(renderProps) => (
                                    <div onClick={renderProps.onClick}>
                                        <FcGoogle size="40px" style={{ marginRight: 8 }} />
                                    </div>
                                )}
                            />
                            <FacebookLogin
                                appId={config.FB_APP_ID}
                                callback={handleLogInFacebook}
                                onFailure={(e) => {
                                    console.info(e);
                                }}
                                disableMobileRedirect={true}
                                cssClass='fb-login'
                                textButton={false}
                                icon={<SiFacebook size="36px" style={{ marginLeft: 8 }} color="#1877f2" />}
                            />
                        </Flex> */}
                    </Stack>
                </Box>
            </Stack >
        </Flex >
    );
}

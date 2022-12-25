import React from "react";
import {
    Tag,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
} from "@chakra-ui/react";
import authAPIs from "@/apis/auth";

export default function Login({ onSuccess }) {
    const [state, setState] = React.useState({
        username: "",
        password: "",
        confirm: '',
        email: '',
        error: '',
        isLoading: false,
    });
    const handleSignUp = async () => {
        if (!state.username || !state.password || !state.email) {
            return setState(s => ({
                ...s,
                error: 'Vui lòng điền đầu đủ thông tin!!!'
            }))
        }
        if (state.password !== state.confirm) {
            return setState(s => ({
                ...s,
                error: 'Mật khẩu không khớp!!!'
            }))
        }
        try {
            const res = await authAPIs.signUp({
                username: state.username,
                password: state.password,
                email: state.email
            });
            onSuccess(res);
        } catch (error) {
            const mess = error?.data?.message || "Lỗi không xác định!!!"
            setState(s => ({
                ...s,
                error: mess
            }))
        }

    };

    const handleChange =
        (name) =>
            ({ target }) => {
                setState((s) => ({
                    ...s,
                    [name]: target.value,
                    error: ''
                }));
            };
    return (
        <Stack spacing={4}>
            {state.error && <Tag size='lg' colorScheme='red' borderRadius='full'>{state.error}</Tag>}
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                    value={state.username}
                    onChange={handleChange("username")}
                    type="username"
                />
            </FormControl>
            <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                    value={state.email}
                    onChange={handleChange("email")}
                    type="username"
                />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Mật khẩu</FormLabel>
                <Input
                    value={state.password}
                    onChange={handleChange("password")}
                    type="password"
                />
            </FormControl>
            <FormControl id="confirm">
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <Input
                    value={state.confirm}
                    onChange={handleChange("confirm")}
                    type="password"
                />
            </FormControl>
            <Stack spacing={10}>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                >
                </Stack>
                <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                        bg: "blue.500",
                    }}
                    onClick={handleSignUp}
                    disabled={state.isLoading}
                >
                    Đăng ký
                </Button>
            </Stack>
        </Stack>
    );
}

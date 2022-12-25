import React from "react";
import {
    Tag,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
} from "@chakra-ui/react";
import authAPIs from "@/apis/auth";

export default function Login({ onSuccess }) {
    const [state, setState] = React.useState({
        username: "",
        password: "",
        error: "",
        isLoading: false,
    });
    const handleLogin = async () => {
        if (!state.username || !state.password) {
            return setState(s => ({
                ...s,
                error: 'Vui lòng điền đầu đủ thông tin!!!'
            }))
        }
        try {
            const res = await authAPIs.logIn({
                username: state.username,
                password: state.password,
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

            <FormControl id="email">
                <FormLabel>Username/Email</FormLabel>
                <Input
                    value={state.username}
                    onChange={handleChange("username")}
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
            <Stack spacing={10}>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                >
                    <Link href="/forgot-password" color={"blue.400"}>Quên mật khẩu</Link>
                </Stack>
                <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                        bg: "blue.500",
                    }}
                    onClick={handleLogin}
                    disabled={state.isLoading}
                >
                    Đăng nhập
                </Button>
            </Stack>
        </Stack>
    );
}

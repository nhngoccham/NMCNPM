import axios from "axios";

const authAPIs = {
    check() {
        return axios({
            url: "/v1/auth/check",
            method: "get",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    refreshToken({ refreshToken }) {
        return axios({
            url: "/v1/auth/refresh-token",
            method: "POST",
            data: { refreshToken }
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    signUp({ username, password, email }) {
        return axios({
            url: "/v1/auth/signup",
            method: "POST",
            data: { username, password, email },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    logIn({ username, password }) {
        return axios({
            url: "/v1/auth/login",
            method: "POST",
            data: { username, password },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    logInWithGoogle({ token }) {
        return axios({
            url: "/v1/auth/login/google",
            method: "post",
            data: { token },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    logInWithFacebook({ token }) {
        return axios({
            url: "/v1/auth/login/facebook",
            method: "post",
            data: { token },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    forgotPassword(data) {
        return axios({
            url: "/v1/auth/forgot-password",
            method: "post",
            data: data,
        })
            .then((res) => res.data)
            .catch((e) => e);
    },
};

export default authAPIs;

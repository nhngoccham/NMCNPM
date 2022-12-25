import axios from "axios";

const matchAPIs = {
    create: (data) => {
        return axios({
            url: "/v1/matches/",
            method: "POST",
            data,
        })
            .then((res) => res.data)
            .catch((err) => err.response);
    },
    createDetail: (id, data) => {
        return axios({
            url: `/v1/matches/${id}/detail`,
            method: "POST",
            data,
        })
            .then((res) => res.data)
            .catch((err) => err.response);
    },
    getById: (id) => {
        return axios({
            url: "/v1/matches/",
            method: "GET",
        })
            .then((res) => {
                return res.data.forEach((match) => match._id === id);
            })
            .catch((err) => err.response);
    },
    update: (id, data) => {
        return axios({
            url: `/v1/matches/${id}`,
            method: "PUT",
            data,
        })
            .then((res) => res.data)
            .catch((err) => err.response);
    },
    createEnd: (id, data) => {
        return axios({
            url: `/v1/matches/${id}/isEnded`,
            method: "POST",
            data,
        })
            .then((res) => res.data)
            .catch((err) => err.response);
    },
    createHighlight: (id, data) => {
        return axios({
            url: `/v1/matches/${id}/highlight`,
            method: "POST",
            data,
        })
            .then((res) => res.data)
            .catch((err) => err.response);
    },
    getAll({ page = 1, perPage = 100 }) {
        return axios({
            url: `/v1/matches?page=${page}&perPage=${perPage}`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    // getById(id) {
    //     return axios({
    //         url: `/v1/leagues/${id}`,
    //         method: "GET",
    //     })
    //         .then((res) => res.data)
    //         .catch((e) => {
    // throw e.response
    // });
    // },
};

export default matchAPIs;

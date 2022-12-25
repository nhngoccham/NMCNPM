import axios from 'axios';

const roundAPIs = {
    create: (data) => {
        return axios({
            url: '/v1/rounds/',
            method: "POST",
            data
        })
            .then(res => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getAll: () => {
        return axios({
            url: '/v1/rounds/',
            method: "GET",
        })
            .then(res => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getTables: (id) => {
        return axios({
            url: `/v1/rounds/${id}/tables`,
            method: "GET",
        })
            .then(res => res.data)
            .catch((e) => {
                throw e.response
            });
    },
}

export default roundAPIs;
import axios from 'axios';

const tableAPIs = {
    create: (data) => {
        return axios({
            url: '/v1/tables/',
            method: "POST",
            data
        })
            .then(res => res.data)
            .catch(err => err.response)
    },
    getById: (id) => {
        return axios({
            url: `/v1/tables/${id}`,
            method: "GET",
        })
            .then(res => res.data)
            .catch(err => err.response)
    },
}

export default tableAPIs;
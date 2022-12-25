import axios from 'axios';

const leagueAPIs = {
    create: (data) => {
        return axios({
            url: '/v1/leagues/',
            method: "POST",
            data
        })
            .then(res => res.data)
            .catch(err => err.response)
    },
    getAll() {
        return axios({
            url: `/v1/leagues`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getAllMatches(id) {
        return axios({
            url: `/v1/leagues/${id}/matches`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getMyLeagues() {
        return axios({
            url: `/v1/leagues/me`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getById(id) {
        return axios({
            url: `/v1/leagues/${id}`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    // getRounds(id) {
    //     return axios({
    //         url: `/v1/leagues/${id}/rounds`,
    //         method: "GET",
    //     })
    //         .then((res) => res.data)
    //         .catch((e) => e.response);
    // }, // This is a conflict
    createTeam(id, data) {
        return axios({
            url: `/v1/leagues/${id}/teams`,
            method: "POST",
            data
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    updateTeam(id, data) {
        return axios({
            url: `/v1/leagues/${id}/teams`,
            method: "PUT",
            data
        })
    },
    getRounds(id) {
        return axios({
            url: `/v1/leagues/${id}/rounds`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    pay(leagueId, id) {
        return axios({
            url: `/v1/leagues/${leagueId}/pay`,
            method: "POST",
            data: { id }
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
    getStandings(id, type, typeId) {
        return axios({
            url: `/v1/leagues/${id}/standings/${type}/${typeId}`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response
            });
    },
}

export default leagueAPIs;
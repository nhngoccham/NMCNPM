import axios from "axios";

const teamAPIs = {
    get() {
        return axios({
            url: `/v1/teams`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    getMatches({ id }) {
        return axios({
            url: `/v1/teams/${id}/matches`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    getMyTeams() {
        return axios({
            url: `/v1/teams/me`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    create({ name, logo, description, foundedDate, secondaryKit, primaryKit }) {
        return axios({
            url: "/v1/teams/",
            method: "POST",
            data: {
                name,
                logo,
                description,
                foundedDate,
                secondaryKit,
                primaryKit,
            },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    getById({ id }) {
        return axios({
            url: `/v1/teams/${id}`,
            method: "GET",
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    addMember({ id, name, birthday, avatar, number, position }) {
        return axios({
            url: `/v1/teams/${id}/members`,
            method: "POST",
            data: { name, birthday, avatar, number, position },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    updateMember({ id, member, newMember }) {
        return axios({
            url: `/v1/teams/${id}/members`,
            method: "PUT",
            data: { member, newMember },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
    deleteMember({ id, member }) {
        return axios({
            url: `/v1/teams/${id}/members`,
            method: "DELETE",
            data: { member },
        })
            .then((res) => res.data)
            .catch((e) => {
                throw e.response;
            });
    },
};

export default teamAPIs;

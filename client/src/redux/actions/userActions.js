import { SET_USER_DATA } from "../constants/types";

export const actSetUserData = ({ user = {}, accessToken = "" }) => ({
    type: SET_USER_DATA,
    payload: { user, accessToken },
});

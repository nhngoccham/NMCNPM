import { SET_USER_DATA } from "../constants/types";

const initialState = {
    user: {},
    accessToken: "",
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER_DATA:
            return { ...state, ...payload };

        default:
            return { ...state };
    }
};

export default userReducer;

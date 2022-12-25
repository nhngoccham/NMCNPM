import jwt from "jsonwebtoken";
import axios from "axios";

export const createAccessToken = (user) => {
    if (!user && !user?._id) {
        return null;
    }

    const payload = { user: { _id: user?._id } };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_OPTS_EXPIRE_IN,
        issuer: process.env.JWT_OPTS_ISSUER,
    });
};

export const createRefreshToken = (user) => {
    if (!user && !user?._id) {
        return null;
    }

    const payload = { user: { _id: user?._id } };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_OPTS_EXPIRE_IN,
        issuer: process.env.JWT_OPTS_ISSUER,
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_OPTS_EXPIRE_IN,
        issuer: process.env.JWT_OPTS_ISSUER,
    });
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_OPTS_EXPIRE_IN,
        issuer: process.env.JWT_OPTS_ISSUER,
    });

};

export const getTokenFromHeaders = (req) => {
    const token = req.headers['x-access-token'];

    if (token) {
        return verifyAccessToken(token);
    }
    return null;
};

const GG_BASE_URL = "https://www.googleapis.com/userinfo/v2/me";

export const getInfoFromGoogleToken = async (accessToken) => {
    try {
        const res = await axios.get(GG_BASE_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.status === 200) {
            const user = {
                email: res.data.email,
                name: res.data.name,
                firstname: res.data.given_name,
                lastname: res.data.family_name,
                avatar: res.data.picture,
                provider: {
                    uid: res.data.id,
                    type: "GOOGLE",
                    accessToken,
                },
            };
            return user;
        }

        throw new Error("No success with Google");
    } catch (error) {
        throw error;
    }
};

const FIELDS = "email,name,picture,first_name,last_name";
const FB_BASE_URL = `https://graph.facebook.com/me?fields=${FIELDS}`;

export const getInfoFromFacebookToken = async (accessToken) => {
    try {
        const res = await axios.get(
            `${FB_BASE_URL}&access_token=${accessToken}`
        );

        if (res.status === 200) {
            const user = {
                email: res.data.email,
                name: res.data.name,
                firstname: res.data.first_name,
                lastname: res.data.last_name,
                avatar: `https://graph.facebook.com/${res.data.id}/picture?type=large`,
                provider: {
                    uid: res.data.id,
                    type: "FACEBOOK",
                    accessToken,
                },
            };
            return user;
        }

        throw new Error("No success with Facebook");
    } catch (error) {
        throw error;
    }
};

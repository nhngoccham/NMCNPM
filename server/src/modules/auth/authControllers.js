import bcrypt from "bcrypt";
import AuthModel from "../../models/auth/authModel";
import MailService from "../../services/mail/mailService";
import * as AuthService from "../../services/auth/authService";
import authModel from "../../models/auth/authModel";

export const authJwt = async (req, res, next) => {
    try {
        const { user } = AuthService.getTokenFromHeaders(req);
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        console.log({ authJwtError: error.message });
        let code = 400;
        if (
            error?.name &&
            error?.name === "TokenExpiredError" &&
            error?.message &&
            error?.message === "jwt expired"
        ) {
            code = 401;
        }
        res.sendStatus(code);
    }
};

export const check = async (req, res) => {
    try {
        const user = await authModel.findById(req.user?._id);
        const accessToken = AuthService.createAccessToken(user);
        const refreshToken = AuthService.createRefreshToken(user);
        const { username, email, _id: id } = user;
        return res.status(200).json({
            accessToken,
            refreshToken,
            user: { username, email, id },
        });
    } catch (error) {
        console.log({ error });
        res.status(401).json(error);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const { user } = AuthService.verifyRefreshToken(refreshToken);
        const accessToken = AuthService.createAccessToken(user);
        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthModel.findOne({
            $or: [{ username: username }, { email: username }],
        });

        let isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            const isReset = bcrypt.compareSync(password, user.resetPassword);
            if (isReset) {
                isMatch = true;
                await AuthModel.updateOne(
                    { _id: user._id },
                    {
                        $set: {
                            password: user.resetPassword,
                            resetPassword: "",
                        },
                    }
                );
            }
        }

        if (!user || !isMatch) {
            throw new Error();
        }
        const accessToken = AuthService.createAccessToken(user);
        const refreshToken = AuthService.createRefreshToken(user);
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                username,
                email: user.email,
                name: user.name,
                id: user._id,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "The username or password provided is incorrect.",
        });
    }
};
export const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res.status(400).json({
                message: "Vui lòng cung cấp đầy đủ thông tin",
            });
            return;
        }

        const userAuth = await AuthModel.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (userAuth) {
            res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
            return;
        } else {
            const user = await AuthModel.create({
                email,
                name: email,
                username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            });
            const accessToken = AuthService.createAccessToken(user);
            const refreshToken = AuthService.createRefreshToken(user);
            return res.status(200).json({
                accessToken,
                refreshToken,
                user: { username, email, _id: user._id },
            });
        }
    } catch (error) {
        console.log({ error });

        return res.status(400).json({ message: "Error sign up" });
    }
};

export async function loginWithGoogle(req, res) {
    try {
        const { token } = req.body;
        const { email, name } = await AuthService.getInfoFromGoogleToken(token);

        const user = await AuthModel.findOne({ email: email });

        if (!user) {
            user = await AuthModel.create({
                email,
                name,
                username: email,
                password: bcrypt.hashSync(
                    `${token}${JSON.stringify(new Date())}`,
                    bcrypt.genSaltSync(10)
                ),
            });
        }
        const accessToken = AuthService.createAccessToken(user);
        const refreshToken = AuthService.createRefreshToken(user);
        return res.status(200).json({
            accessToken,
            refreshToken,
            user: { username: email, email, id: user._id },
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.message });
    }
}

export async function loginWithFacebook(req, res) {
    try {
        const { token } = req.body;
        const data = await AuthService.getInfoFromFacebookToken(token);

        const { email, name } = data;
        const user = await AuthModel.findOne({ email: email });

        if (user) {
            const accessToken = AuthService.createAccessToken(user);
            const refreshToken = AuthService.createRefreshToken(user);
            return res.status(200).json({
                accessToken,
                refreshToken,
                user: { username: email, email, id: user._id },
            });
        } else {
            user = await AuthModel.create({
                email,
                name,
                username: email,
                password: bcrypt.hashSync(
                    `${token}${JSON.stringify(new Date())}`,
                    bcrypt.genSaltSync(10)
                ),
            });
            const accessToken = AuthService.createAccessToken(user);
            const refreshToken = AuthService.createRefreshToken(user);
            return res.status(200).json({
                accessToken,
                refreshToken,
                user: { username: email, email, id: user._id },
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.message });
    }
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await AuthModel.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Người dùng không tồn tại!" });
        }
        const resetPassword = `${Math.floor(
            10000000 + Math.random() * 90000000
        )}`;

        MailService.send({
            email,
            username: user.name || user.username || user.email,
            subject: "Quên mật khẩu",
            message: `Mật khẩu mới của bạn là ${resetPassword}.`,
        });

        await AuthModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    resetPassword: bcrypt.hashSync(
                        resetPassword,
                        bcrypt.genSaltSync(10)
                    ),
                },
            }
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

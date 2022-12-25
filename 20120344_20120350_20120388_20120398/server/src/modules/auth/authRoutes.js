import express from "express";
import * as controllers from "./authControllers";
const authRoutes = new express.Router();

/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Validate User By Token Bear
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Detail
 *         contents:
 *           application/json:
 *             schema:
 *               type: "object"
 *       401:
 *         description: Unauthenticated
 */
authRoutes.get("/check", controllers.authJwt, controllers.check);
authRoutes.post("/refresh-token", controllers.refreshToken);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up
 *     parameters:
 *       - in: body
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Detail
 *         contents:
 *           application/json:
 *             schema:
 *               type: "object"
 *       400:
 *         description: Client Error
 */
authRoutes.post("/signup", controllers.signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in
 *     parameters:
 *       - in: body
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Detail
 *         contents:
 *           application/json:
 *             schema:
 *               type: "object"
 *       401:
 *         description: Unauthenticated
 */
authRoutes.post("/login", controllers.logIn);
authRoutes.post("/login/google", controllers.loginWithGoogle);
authRoutes.post("/login/facebook", controllers.loginWithFacebook);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     parameters:
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Detail
 *         contents:
 *           application/json:
 *             schema:
 *               type: "object"
 *       401:
 *         description: Unauthenticated
 */
authRoutes.post("/forgot-password", controllers.forgotPassword);

export default authRoutes;

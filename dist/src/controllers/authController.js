"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' });
        return;
    }
    const hashedPassword = "$2b$10$WoiGUJIU1IB5VarJOe468eae0wHxD53MI9PJta2ohnBam2R72Kc2S";
    const isLoggedIn = yield bcrypt_1.default.compare(password, hashedPassword);
    if (username === 'admin' && password === '123') {
        const accessToken = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET || "", { expiresIn: '7d' });
        console.log(accessToken);
        res.cookie('accessToken', accessToken, {
            // Prevents client-side JavaScript from accessing the cookie (e.g. document.cookie).
            // This protects against XSS attacks where malicious scripts try to steal the token.
            httpOnly: true, // JS has no access to the cookie
            // When true, the cookie is only sent over HTTPS connections.
            // We enable this in production (where we use HTTPS) but disable it locally (HTTP).
            secure: false,
            // Controls when the cookie is sent with cross-site requests.
            // 'none': Cookie is sent on all cross-origin requests (required when frontend and API are on different domains in production). Requires secure: true.
            // 'lax': Cookie is sent on same-site requests and top-level navigations (safe default for local development).
            sameSite: 'lax',
            // How long the cookie lives in the browser, in milliseconds.
            // After this time the browser automatically deletes the cookie and the user must log in again.
            maxAge: 1000 * 60 * 60 * 24 * 7 // Lives on for 7 days
        });
        res.json({ message: 'You are logged in', isLoggedIn: isLoggedIn });
        return;
    }
    else {
        res.status(401).json({ message: 'username/password are wrong' });
        return;
    }
});
exports.login = login;
//==============================================
// Controller for handling user registration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' });
        return;
    }
    try {
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: "Username is already taken" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.default.create({
            username,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered",
            user: {
                id: newUser._id,
                username: newUser.username,
                is_admin: newUser.is_admin,
                created_at: newUser.created_at,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not register user" });
    }
});
exports.register = register;
//==============================================
// Controller for handling user logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken');
    res.json({ message: "You are logged out" });
});
exports.logout = logout;

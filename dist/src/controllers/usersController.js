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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get all users and get user by ID controllers
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-password");
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not get users" });
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID controller
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findById(id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (_a) {
        res.status(400).json({ message: "Invalid user id" });
    }
});
exports.getUserById = getUserById;
// Update user controller
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password } = req.body;
    const updates = {};
    if (typeof username === "string" && username.trim() !== "") {
        updates.username = username.trim();
    }
    if (typeof password === "string" && password !== "") {
        updates.password = yield bcrypt_1.default.hash(password, 10);
    }
    if (Object.keys(updates).length === 0) {
        res.status(400).json({ message: "Send username or password to update" });
        return;
    }
    try {
        const user = yield User_1.default.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        }).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User updated",
            user,
        });
    }
    catch (_a) {
        res.status(400).json({ message: "Could not update user" });
    }
});
exports.updateUser = updateUser;
// Delete user controller
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User deleted",
            id: user._id,
        });
    }
    catch (_a) {
        res.status(400).json({ message: "Invalid user id" });
    }
});
exports.deleteUser = deleteUser;

import express from "express";
import { 
    getAllUsers, 
    getUserById,
    updateUser,
    deleteUser } from "../controllers/usersController";

import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
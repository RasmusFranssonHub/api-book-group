import express from "express";
import { 
    getAllUsers, 
    getUserById,
    updateUser,
    deleteUser } from "../controllers/usersController";

import { verifyToken, verifyAdmin } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/:id", verifyToken, verifyAdmin, getUserById);
router.patch("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
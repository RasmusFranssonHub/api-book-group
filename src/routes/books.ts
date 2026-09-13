import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;

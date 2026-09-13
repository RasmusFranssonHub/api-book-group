// Ansvarsområde 2 — Oscar
import { Request, Response } from "express";
import { Book } from "../models/Book";

// GET /api/books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta böcker" });
  }
};

// GET /api/books/:id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Boken hittades inte" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "Ogiltigt id" });
  }
};

// POST /api/books
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author, genres, image, published_year } =
      req.body;
    const book = await Book.create({
      title,
      description,
      author,
      genres,
      image,
      published_year,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: "Kunde inte skapa boken" });
  }
};

// PATCH /api/books/:id
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author, genres, image, published_year } =
      req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, description, author, genres, image, published_year },
      { new: true, runValidators: true, omitUndefined: true },
    );
    if (!book) {
      res.status(404).json({ error: "Boken hittades inte" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "Kunde inte uppdatera boken" });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Boken hittades inte" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Ogiltigt id" });
  }
};

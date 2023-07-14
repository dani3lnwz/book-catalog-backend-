import express from "express";
import { BookController } from "./books.controller";

const router = express.Router();

router.post(
  "/",

  BookController.createBook
);
router.get("/latest-book", BookController.getLatestBooks);
router.get("/", BookController.getAllBooks);
router.get(
  "/:id",

  BookController.getSingleBook
);
// router.delete("/:id", BookController.deleteBook);
// router.patch("/:id", BookController.updateBook);

export const BookRoutes = router;

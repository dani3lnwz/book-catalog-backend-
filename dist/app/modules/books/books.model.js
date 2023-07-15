"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    reviews: [
        {
            type: String,
        },
    ],
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;

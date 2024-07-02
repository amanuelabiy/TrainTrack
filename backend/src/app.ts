import express from "express";
const app = express();

require("dotenv").config();

app.use(express.json());

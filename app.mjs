import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./config/db.mjs";

connectToDB();
const app = express();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.MODE_ENV} mode on port ${port}`
  );
});

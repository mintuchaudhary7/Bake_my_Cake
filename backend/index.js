const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./config/databaseConnection")

const PORT = process.env.PORT;

app.use(express.json());

dbConnect();

app.listen(PORT, () =>{
    console.log(`App is running on Port No. ${PORT}`);
})
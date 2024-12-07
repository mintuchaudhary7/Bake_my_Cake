const express = require("express");
const app = express();
const cors = require("cors");

// Allow specific origins (frontend URL)
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods you want to allow
    credentials: true, // Allow cookies if needed
  })
);

require("dotenv").config();
const dbConnect = require("./config/databaseConnection")

const PORT = process.env.PORT;

app.use(express.json());

dbConnect();

const userRoutes = require("./routes/routes");
app.use("/", userRoutes);

app.listen(PORT, () =>{
    console.log(`App is running on Port No. ${PORT}`);
})
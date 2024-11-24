const mongoose = require('mongoose');
require('dotenv').config()

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Error received");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = dbconnect;
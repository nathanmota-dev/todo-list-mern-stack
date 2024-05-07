const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

const { connectToDB } = require("./database/db");

require("dotenv").config();

app.use(express.json());
app.use(cors());

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticate = require("./middleware/authenticate");

const port = process.env.PORT || 3001;

app.use("/api/auth", authenticate, todoRoutes);
app.use("/api/users", userRoutes);

async function startServer() {
    try {
        await connectToDB();
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
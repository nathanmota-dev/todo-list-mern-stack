const express = require("express");
const app = express();

const { connectToDB } = require("./database/db");

app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

const routes = require("./routes/todoRoutes");
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

async function startServer() {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;

const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
        }
    }
    return client;
};

const getConnectedClient = () => {
    if (!client) {
        console.log("No MongoDB client connected. Please ensure the MongoDB connection is established.");
    }
    return client;
};

module.exports = { connectToMongoDB, getConnectedClient };

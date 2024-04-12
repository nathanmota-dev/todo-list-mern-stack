const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("../database/db");
const { ObjectId } = require("mongodb");

const getCollection = async () => {
    const client = await getConnectedClient();
    const collection = client.db("todo-db").collection("todos"); // db name: todo, collection name: todos
    return collection;
}

router.get("/todos", async (req, res) => {
    const collection = await getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

router.post("/todos", async (req, res) => {
    const collection = await getCollection();
    const todo = req.body;

    if (!todo) {
        return res.status(400).json({ message: "Bad Request" });
    }

    todo = (typeof todo === "string") ? todo : JSON.stringify(todo);

    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, id: newTodo.insertedId });

});

module.exports = router;
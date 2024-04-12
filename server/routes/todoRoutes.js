const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("../database/db");
const { ObjectId } = require("mongodb");

const getCollection = async () => {
    const client = await getConnectedClient();
    const collection = client.db("todo-db").collection("todos");
    return collection;
}

router.get("/todos", async (req, res) => {
    const collection = await getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

router.post("/todos", async (req, res) => {
    const collection = await getCollection();
    let todo = req.body.todo;

    if (!todo) {
        return res.status(400).json({ message: "Bad Request. Missing 'todo' data." });
    }

    todo = (typeof todo === "string") ? todo : JSON.stringify(todo);

    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, id: newTodo.insertedId });

});

router.delete("/todos/:id", async (req, res) => {
    const collection = await getCollection();
    const id = new ObjectId(req.params.id);

    const deleteTodo = await collection.deleteOne({ _id: id });

    res.status(200).json(deleteTodo);
});

router.put("/todos/:id", async (req, res) => {
    const collection = await getCollection();
    const id = new ObjectId(req.params.id);
    const { status } = req.body;
    if (typeof status !== "boolean") {
        return res.status(400).json({ message: "Bad Request. 'status' must be a boolean." });
    }

    const updateTodo = await collection.updateOne({ _id: id }, { $set: { status: !status } });

    res.status(200).json(updateTodo);
});

module.exports = router;
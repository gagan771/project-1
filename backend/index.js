const express = require('express');
const app = express();
const port = 3000;
const { createTodo, updateTodo } = require('./types');
const { todo } = require('node:test');

app.use(express.json());

app.get('/todos', async (req, res) => {
 const  todos = await todo.find({});
  // Add your logic to fetch and return todos
  res.json({
    msg: "todo created"
  })
});

app.post('/todos', async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent wrong input",
    });
    return;
  }
  await todo.create({
    title: createPayload.tittle,
    description: createPayload.description,
    complete: false
  })
  // Add your logic to create a new todo
  res.status(201).json(parsedPayload.data);
});

app.put('/todos/:id/complete', async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent wrong input",
    });
    return;
  }
  await todo.update({
    _id: updatePayload.id,
    complete: true
  })
  // Add your logic to update the todo
  res.json(parsedPayload.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
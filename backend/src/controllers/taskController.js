import prisma from "../lib/prisma.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "LOW",
        status: "TODO", // 🔥 ВАЖНО
        userId: req.userId,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET USER TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
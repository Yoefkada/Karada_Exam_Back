const prisma = require("../utils/primsaClient");

const addTask = async (req, res) => {
  const { title, content, categories } = req.body;
  const userId = req.user.id;

  try {
    const newTask = await prisma.task.create({
      data: { title, content, userId },
    });

    if (categories.length > 0 && newTask) {
      const categoryIds = await prisma.category.findMany({
        where: {
          title: {
            in: categories,
          },
        },
        select: {
          id: true,
        },
      });

      const categoryNotes = categoryIds.map((category) => ({
        categoryId: category.id,
        taskId: newTask.id,
      }));

      await prisma.TaskCategory.createMany({ data: categoryNotes });
    }

    return res.status(200).send({ message: "task successfully added" });
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .send({ message: "Failed to add note", error: error.message });
  }
};

const addCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { title },
    });
    if (existingCategory) {
      return res.status(500).send({ message: "Already Exists" });
    } else {
      await prisma.category.create({ data: { title } });
      return res.status(200).send({ message: "added successfully" });
    }
  } catch (error) {
    console.error("Error adding category:", error);
    return res
      .status(500)
      .send({ message: "Failed to add category", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await prisma.task.findUnique({ where: { id } });
    if (!exists) {
      return res.status(404).send({ message: "Task not found" });
    } else {
      await prisma.task.update({
        where: { id: exists.id },
        data: { deletedAt: new Date() },
      });
      return res.status(200).send({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleteing task:", error);
    return res
      .status(500)
      .send({ message: "Failed to delete task", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) {
      return res.status(404).send({ message: "Category not found" });
    } else {
      await prisma.task.delete({ where: { id: exists.id } });
      return res.status(200).send({ message: "Category deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleteing Category:", error);
    return res
      .status(500)
      .send({ message: "Failed to delete Category", error: error.message });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await prisma.task.findMany({ where: { userId } });
    return res.status(200).send({ message: "Request successfully", tasks });
  } catch (error) {
    console.error("Error getting data:", error);
    return res
      .status(500)
      .send({ message: "Failed getting data", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await prisma.task.findUnique({
      where: { id, userId },
      include: { taskCategory: { include: { category: true } } },
    });

    return res.status(200).send({ message: "Request successfully", task });
  } catch (error) {
    console.error("Error getting data:", error);
    return res
      .status(500)
      .send({ message: "Failed getting data", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    return res.status(200).send({ message: "Request successfully", category });
  } catch (error) {
    console.error("Error getting Category:", error);
    return res
      .status(500)
      .send({ message: "Failed getting Category", error: error.message });
  }
};

const editTask = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const exists = await prisma.task.findUnique({
      where: { userId, id },
    });

    if (!exists) {
      return res.status(404).send({ message: "not found" });
    } else {
      await prisma.task.update({
        where: { userId, id },
        data: { title, content },
      });

      return res.status(200).send({ message: "edited successfully" });
    }
  } catch (error) {
    console.error("Error editing task:", error);
    return res
      .status(500)
      .send({ message: "Failed editing task", error: error.message });
  }
};

module.exports = {
  addTask,
  addCategory,
  deleteTask,
  getTasks,
  getTaskById,
  deleteCategory,
  getCategoryById,
  editTask,
};

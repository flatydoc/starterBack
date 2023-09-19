import Tasks from "../models/Tasks.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class TasksService {
  async add({ title, text, priority, owner, isComplete }) {
    const task = await Tasks.create({
      title,
      text,
      priority,
      owner,
      isComplete,
    });

    return { task };
  }

  async get(id) {
    const task = await Tasks.findOne({
      where: {
        id,
      },
    });
    return task;
  }

  async complete(id) {
    const task = await Tasks.findOne({ where: { id } });

    if (!task) {
      throw ApiError.BadRequest("ошибка");
    }

    await Tasks.update(
      {
        isComplete: true,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  async getAll(id) {
    const tasks = await Tasks.findAll({
      where: {
        owner: id,
      },
    });
    return tasks;
  }
}

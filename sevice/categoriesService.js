import Event from "../models/Event.js";
import Category from "../models/Category.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class categoriesService {
  async getAll() {
    const categories = await Category.findAll({
      include: [
        {
          model: Event,
          //   attributes: ["id", "name"],
        },
      ],
    });
    return categories;
  }

  async add({ name }) {
    const category = await Category.create({
      name,
    });

    return { category };
  }

  async addEvent(categoryId, eventId) {
    const category = await Category.findByPk(categoryId);
    const event = await Event.findByPk(eventId);

    await category.addEvent(event);
  }
}

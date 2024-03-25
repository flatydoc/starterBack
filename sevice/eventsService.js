import Event from "../models/Event.js";
import User from "../models/User.js";
import Artist from "../models/Artist.js";
import Category from "../models/Category.js";
import db from "../db.js";
import { Op } from "sequelize";
// import ApiError from "../exceptions/apiErrors.js";

export default class EventsService {
  async getAll() {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Artist,
          attributes: ["id", "name", "surname", "nickname", "city"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    return events;
  }

  async getEventsBySearch(search) {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Artist,
          attributes: ["id", "name", "surname", "nickname", "city"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    return events;
  }

  async getById(id) {
    const event = await Event.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Artist,
          attributes: ["id", "name", "surname", "nickname", "city"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    return event;
  }

  async getEventsByUserId(userId) {
    const user = await User.findByPk(userId);

    if (user) {
      const events = await user.getEvents();
      return events;
    } else {
      throw new Error("User not found");
    }
  }

  async getByTitle(title) {
    const events = await Event.findAll({
      where: {
        title: {
          [Op.startsWith]: title,
        },
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Artist,
          attributes: ["id", "name", "surname", "nickname", "city"],
        },
      ],
    });
    return events;
  }

  async add({
    title,
    posterUrl,
    description,
    date,
    time,
    photos,
    place,
    price,
    artists,
    category,
  }) {
    const event = await Event.create({
      title,
      posterUrl,
      description,
      date,
      time,
      place,
      photos,
      price,
    });
    if (artists) {
      for (const artist of artists) {
        const [foundArtist, created] = await Artist.findOrCreate({
          where: { nickname: artist.nickname },
          defaults: artist,
        });

        await event.addArtist(foundArtist);
      }
    }

    if (category) {
      const foundCategory = await Category.findByPk(category.id);
      await foundCategory.addEvent(event);
    }
    return { event };
  }

  async edit({
    id,
    title,
    posterUrl,
    description,
    date,
    time,
    photos,
    place,
    price,
    artists,
    category,
  }) {
    const event = await Event.findByPk(id);
    await event.update(
      {
        title,
        posterUrl,
        description,
        date,
        time,
        place,
        photos,
        price,
        artists,
      },
      {
        where: {
          id,
        },
      }
    );

    for (const artist of artists) {
      const [foundArtist, created] = await Artist.findOrCreate({
        where: { nickname: artist.nickname },
        defaults: artist,
      });

      await event.addArtist(foundArtist);
    }

    if (category) {
      const foundCategory = await Category.findByPk(category.id);
      await foundCategory.addEvent(event);
    }

    return { event };
  }

  async delete(id) {
    await db.query(`DELETE FROM user_events WHERE eventId = ${id}`);

    const event = await Event.destroy({
      where: {
        id,
      },
    });

    return { event };
  }

  async subscribeToEvent(eventId, userId) {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    await user.addEvent(event);
  }
}

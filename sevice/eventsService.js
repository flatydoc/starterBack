import Event from "../models/Event.js";
import User from "../models/User.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class EventsService {
  async getAll() {
    const events = await Event.findAll({
      include: User,
    });
    return events;
  }

  async get(id) {
    const event = await Event.findOne({
      where: {
        id,
      },
    });
    return event;
  }

  async add({
    title,
    poster,
    text,
    date,
    time,
    photos,
    place,
    tags,
    price,
    artists,
  }) {
    const event = await Event.create({
      title,
      poster,
      text,
      date,
      time,
      place,
      photos,
      tags,
      price,
      artists,
    });

    return { event };
  }

  async edit({
    title,
    poster,
    text,
    date,
    time,
    photos,
    place,
    tags,
    price,
    id,
    artists,
  }) {
    const event = await Event.update(
      {
        title,
        poster,
        text,
        date,
        time,
        place,
        photos,
        price,
        tags,
        artists,
      },
      {
        where: {
          id,
        },
      }
    );

    return { event };
  }

  async delete(id) {
    const event = await Event.destroy({
      where: {
        id,
      },
    });

    return { event };
  }

  async subscribe(eventId, userId) {}
}

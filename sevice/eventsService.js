import { Events } from "../models/Events.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class EventsService {
  async getAll() {
    const events = await Events.findAll();
    return events;
  }

  async get(id) {
    const event = await Events.findOne({
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
    const event = await Events.create({
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
    const event = await Events.update(
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
    const event = await Events.destroy({
      where: {
        id,
      },
    });

    return { event };
  }

  async subscribe(eventId, userId) {
    return console.log(`user ${userId} subscribe on event${eventId}`);
  }
}

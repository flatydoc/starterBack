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

  async add({ title, text, date, place, price }) {
    const event = await Events.create({
      title,
      text,
      date,
      place,
      price,
    });

    return { event };
  }

  async edit({ title, text, date, place, price, id }) {
    const event = await Events.update(
      {
        title,
        text,
        date,
        place,
        price,
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

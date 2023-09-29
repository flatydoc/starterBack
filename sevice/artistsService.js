import { Artists } from "../models/Artists.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class ArtistsService {
  async getAll() {
    const artists = await Artists.findAll();
    return artists;
  }

  async get(id) {
    const artist = await Artists.findOne({
      where: {
        id,
      },
    });
    return artist;
  }

  async add({ name, city, surname, nickname }) {
    const artist = await Artists.create({
      name,
      city,
      surname,
      nickname,
    });

    return { artist };
  }

  async edit({ name, city, surname, nickname }) {
    const artist = await Artists.update(
      {
        name,
        city,
        surname,
        nickname,
      },
      {
        where: {
          id,
        },
      }
    );

    return { artist };
  }

  async delete(id) {
    const artist = await Artists.destroy({
      where: {
        id,
      },
    });

    return { artist };
  }

  async subscribe(eventId, userId) {
    return console.log(`user ${userId} subscribe on event${eventId}`);
  }
}

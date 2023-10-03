import Artist from "../models/Artist.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class ArtistsService {
  async getAll() {
    const artists = await Artist.findAll();
    return artists;
  }

  async get(id) {
    const artist = await Artist.findOne({
      where: {
        id,
      },
    });
    return artist;
  }

  async add({ name, city, surname, nickname }) {
    const artist = await Artist.create({
      name,
      city,
      surname,
      nickname,
    });

    return { artist };
  }

  async edit({ name, city, surname, nickname }) {
    const artist = await Artist.update(
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
    const artist = await Artist.destroy({
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

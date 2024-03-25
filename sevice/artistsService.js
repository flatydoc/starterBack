import Artist from "../models/Artist.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class ArtistsService {
  async getAll() {
    const artists = await Artist.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Event,
        },
      ],
    });
    return artists;
  }

  async getById(id) {
    const artist = await Artist.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Event,
        },
      ],
    });
    return artist;
  }

  async getArtistsByUserId(userId) {
    const user = await User.findByPk(userId);

    if (user) {
      const artists = await user.getArtists();
      return artists;
    } else {
      throw new Error("User not found");
    }
  }

  async getArtistsByEventId(eventId) {
    const event = await Event.findByPk(eventId);

    if (event) {
      const artists = await event.getArtists();
      return artists;
    } else {
      throw new Error("Event not found");
    }
  }

  async add({ name, city, surname, nickname, bio }) {
    const artist = await Artist.create({
      name,
      city,
      surname,
      nickname,
      bio,
    });

    return { artist };
  }

  async edit({ id, name, city, surname, nickname, bio }) {
    const artist = await Artist.update(
      {
        name,
        city,
        surname,
        nickname,
        bio,
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

  async subscribeToArtist(artistId, userId) {
    const user = await User.findByPk(userId);
    const artist = await Artist.findByPk(artistId);

    await user.addArtist(artist);
  }
}

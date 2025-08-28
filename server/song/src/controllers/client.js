import sql from "../configs/connectDB.js";
import redis from "../configs/redis.js";
import TryCatch from "../utils/TryCatch.js";

export const getAllAlbum = TryCatch(async (req, res) => {
  let albums;
  const key = `albums`;

  albums = await redis.get(key);

  if (albums) {
    res.json({ albums: JSON.parse(albums) });
    return;
  }

  albums = await sql`
        SELECT * FROM albums
    `;

  await redis.set("albums", JSON.stringify(key), "EX", expire);

  res.json({ albums: albums });
});

export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
  const { id } = req.params;

  const key = `album:${id}`;

  const albumQuery = await sql`
    SELECT * FROM albums
    WHERE id = ${id}
    `;

  if (!albumQuery || albumQuery.length === 0) {
    res.status(400).json({ message: "album id Not found" });
    return;
  }

  let songQuery = await redis.get(key);
  if (songQuery) {
    res.json(JSON.parse(songQuery));
    return;
  }

  songQuery = await sql`
        SELECT * FROM songs
        WHERE album_id = ${id}
    `;
  const response = { albumQuery: albumQuery[0], songs: songQuery };

  await redis.set(key, JSON.stringify(response), "EX", 1800);

  res.json(response);
});

export const getAllSong = TryCatch(async (req, res) => {
  const key = "song";
  let songQuery = await redis.get(key);

  if (songQuery) {
    res.json({ songs: JSON.parse(songQuery) });
    return;
  }

  songQuery = await sql`
        SELECT * FROM songs
    `;

  await redis.set(key, JSON.stringify(songQuery), "EX", 1800);
  console.log("store in redis");
  res.json({ songs: songQuery });
});

export const getSong = TryCatch(async (req, res) => {
  const { id } = req.params;

  const songQuery = await sql`
    SELECT * FROM songs
    WHERE id = ${id}
    `;
  if (!songQuery || songQuery.length === 0) {
    res.status(400).json({ message: "song id Not found" });
    return;
  }

  const key = `song:${id}`;
  let songIdQuery = await redis.get(key);

  if (songIdQuery) {
    res.json({ song: JSON.parse(songIdQuery) });
    return;
  }

  songIdQuery = await sql`
        SELECT * FROM songs
        WHERE id = ${id}
    `;

  await redis.set(key, JSON.stringify(songIdQuery), "EX", 1800);
  console.log("store in redis");
  res.json({ song: songIdQuery[0] });
});

import cloudinary from "../configs/cloudinary.js";
import sql from "../configs/connectDB.js";
import getBuffer from "../utils/dataUri.js";
import TryCatch from "../utils/TryCatch.js";

export const addAlbum = TryCatch(async (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json("Not Authenticated");
    return;
  }

  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "attach thumbnail" });
    return;
  }

  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    res.status(400).json({ message: "file meta data wrong" });
    return;
  }

  const upload = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "albums",
  });

  const query = await sql`
    INSERT INTO albums (title,description,thumbnail)
    VALUES (${title},${description},${upload.secure_url})
    RETURNING *
  `;

  res.status(201).json({ message: "add Song sucessful", album: query[0] });
});

export const addSong = TryCatch(async (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json("Not Authenticated");
    return;
  }

  const { title, description, album_id } = req.body;
  const file = req.file;

  if (!title || !description) {
    res.status(400).json({ message: "missing field" });
    return;
  }

  const queryIsAlbum = await sql`
    SELECT * FROM albums
    WHERE id = ${album_id}
  `;

  if (!queryIsAlbum || queryIsAlbum.length === 0) {
    res.status(400).json({ message: "album Id not match" });
    return;
  }

  if (!file) {
    res.status(400).json({ message: "attach audio" });
    return;
  }

  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    res.status(400).json({ message: "file meta data wrong" });
    return;
  }

  const upload = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "video",
  });

  const queryAddSong = await sql`
    INSERT INTO songs
    (title,description,audio,album_id)
    VALUES
    (${title},${description},${upload.secure_url},${queryIsAlbum[0].id})
    RETURNING *
  `;

  res.status(201).json({ message: "add Song sucessful" });
});

export const addThumbnailToSong = TryCatch(async (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json("Not Authenticated");
    return;
  }

  const { id } = req.params;
  const queryIsSong = await sql`
    SELECT * FROM songs
    WHERE id = ${id}
  `;

  if (!queryIsSong || queryIsSong.length === 0) {
    res.status(400).json({ message: "songs id is wrong" });
    return;
  }

  const file = req.file;
  if (!file) {
    res.status(400).json({ message: "attach audio" });
    return;
  }
  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    res.status(400).json({ message: "file meta data wrong" });
    return;
  }

  const uplaodClouds = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "songs",
  });

  const queryThumbnailUpload = await sql`
    UPDATE songs
    SET thumbnail = ${uplaodClouds.secure_url}
    WHERE id = ${id}
    RETURNING *
  `;

  res.json({
    message: "added Thumnail to Songs",
    song: queryThumbnailUpload[0],
  });
});

export const deleteAlbum = TryCatch(async (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json("Not Authenticated");
    return;
  }

  const { id } = req.params;

  const queryIsAlbum = await sql`
    SELECT * FROM albums
    WHERE id = ${id}
  `;

  if (!queryIsAlbum || queryIsAlbum.length === 0) {
    res.status(400).json({ message: "albums id is wrong" });
    return;
  }

  const queryDeleteSong = await sql`
    DELETE FROM songs
    WHERE album_id = ${id}
  `;

  const queryDeleteAlbum = await sql`
    DELETE FROM albums
    WHERE id = ${id}
  `;

  res.json({ message: "sucessful delete album" });
});

export const deleteSong = TryCatch(async (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json("Not Authenticated");
    return;
  }

  const { id } = req.params;

  const queryIsSong = await sql`
    SELECT * FROM songs
    WHERE id = ${id}
  `;
  if (!queryIsSong || queryIsSong.length === 0) {
    res.status(400).json({ message: "songs id is wrong" });
    return;
  }
  console.log(queryIsSong);
  const queryDeleteSong = await sql`
    DELETE FROM songs
    WHERE id = ${id}
  `;

  res.json({ message: "sucessful delete song" });
});

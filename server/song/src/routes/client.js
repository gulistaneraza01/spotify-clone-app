import express from "express";
import {
  getAllSongsOfAlbum,
  getAllAlbum,
  getAllSong,
  getSong,
} from "../controllers/client.js";

const router = express.Router();

router.get("/album/all", getAllAlbum);
router.get("/album/:id", getAllSongsOfAlbum);
router.get("/song/all", getAllSong);
router.get("/song/:id", getSong);

export default router;

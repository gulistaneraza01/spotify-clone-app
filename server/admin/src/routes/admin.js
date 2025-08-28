import express from "express";
import {
  addAlbum,
  addSong,
  addThumbnailToSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/album/new", upload, addAlbum);
router.post("/song/add", upload, addSong);
router.post("/song/:id", upload, addThumbnailToSong);
router.delete("/album/:id", deleteAlbum);
router.delete("/song/:id", deleteSong);

export default router;

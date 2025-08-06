import express from "express"
import { getAllAlbums, getAllSongs, getAllSongsByAlbum, getSingleSong } from "./controller";
const router = express.Router()

router.get("/album/all", getAllAlbums);
router.get("/song/all", getAllSongs);
router.get("/album/:id", getAllSongsByAlbum);
router.get("/song/:id", getSingleSong);

export default router;
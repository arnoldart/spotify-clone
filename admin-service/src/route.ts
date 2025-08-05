import express from "express"
import { addAlbum, addSong } from "./controller.js";
import { isAuth } from "./middleware.js";
import uploadFile from "./middleware.js";

const router = express.Router()

router.post("/album/new", isAuth, uploadFile, addAlbum)
router.post("/song/new", isAuth, uploadFile, addSong)

export default router;
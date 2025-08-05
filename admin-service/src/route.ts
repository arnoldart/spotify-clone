import express from "express"
import { addAlbum } from "./controller.js";
import { isAuth } from "./middleware.js";

const router = express.Router()

router.post("/album/new", isAuth, addAlbum)

export default router;
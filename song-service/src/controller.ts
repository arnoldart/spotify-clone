import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";

export const getAllAlbums = TryCatch(async (req, res) => {
    let albums;

    albums = await sql`SELECT * FROM albums`;

    if (albums.length === 0) {
        res.status(404).json({
            message: "No albums found",
        });
        return;
    }


    res.json(albums);
});

export const getAllSongs = TryCatch(async (req, res) => {
    let songs;

    songs = await sql`SELECT * FROM songs`;

    if (songs.length === 0) {
        res.status(404).json({
            message: "No songs found",
        });
        return;
    }

    res.json(songs);
});

export const getAllSongsByAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;

    let songs, albums;

    albums = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if (albums.length === 0) {
        res.status(404).json({
            message: "No albums found for this id",
        });
        return;
    }

    songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;

    if (songs.length === 0) {
        res.status(404).json({
            message: "No songs found for this album",
        });
        return;
    }

    const response = {
        album: albums[0],
        songs: songs,
    };

    res.json(response);

});

export const getSingleSong = TryCatch(async (req, res) => {
    const { id } = req.params;
    
    const song = await sql`SELECT * FROM songs WHERE id = ${id}`;

    if (song.length === 0) {
        res.status(404).json({
            message: "No song found with this id",
        });
        return;
    }

    res.json(song[0]);
});
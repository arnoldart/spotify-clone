import { sql } from "./config/db.js";
import { redisClient } from "./index.js";
import TryCatch from "./TryCatch.js";


export const getAllAlbums = TryCatch(async (req, res) => {
    let albums;

    const CACHE_EXPIRY = 1800

    if(redisClient.isReady) {
        albums = await redisClient.get("albums");
    }

    if (albums) {
        return res.json(JSON.parse(albums));
    }else {
        albums = await sql`SELECT * FROM albums`;
        
        if(redisClient.isReady) {
            await redisClient.set("albums", JSON.stringify(albums), {
                EX: CACHE_EXPIRY
            });
        }
        
        res.json(albums);
        return;
    }

    // albums = await sql`SELECT * FROM albums`;

    // if (albums.length === 0) {
    //     res.status(404).json({
    //         message: "No albums found",
    //     });
    //     return;
    // }


    // res.json(albums);
});

export const getAllSongs = TryCatch(async (req, res) => {
  let songs;
  const CACHE_EXPIRY = 1800;

  if (redisClient.isReady) {
    songs = await redisClient.get("songs");
  }

  if (songs) {
    return res.json(JSON.parse(songs));
  } else {
    songs = await sql`SELECT * FROM songs`;

    if (redisClient.isReady) {
      await redisClient.set("songs", JSON.stringify(songs), {
        EX: CACHE_EXPIRY,
      });
    }

    res.json(songs);
    return;
  }
});

export const getAllSongsByAlbum = TryCatch(async (req, res) => {
  const { id } = req.params;
  const CACHE_EXPIRY = 1800;

  let album, songs;

  if (redisClient.isReady) {
    const cacheData = await redisClient.get(`album_songs_${id}`);
    if (cacheData) {
      console.log("cache hit");
      res.json(JSON.parse(cacheData));
      return;
    }
  }

  album = await sql`SELECT * FROM albums WHERE id = ${id}`;

  if (album.length === 0) {
    res.status(404).json({
      message: "No album with this id",
    });
    return;
  }

  songs = await sql` SELECT * FROM songs WHERE album_id = ${id}`;

  const response = { songs, album: album[0] };

  if (redisClient.isReady) {
    await redisClient.set(`album_songs_${id}`, JSON.stringify(response), {
      EX: CACHE_EXPIRY,
    });
  }

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
import React, { useEffect, useRef, useState } from "react";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay, FaRandom, FaRedo, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineQueueList, HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { BsFullscreen, BsPip } from "react-icons/bs";
import { useSongData } from "../context/useSongContext";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isRepeated, setIsRepeated] = useState<boolean>(false);

  // Helper function to format time
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  return (
    <div>
      {song && (
        <>
          {/* Desktop Version */}
          <div className="hidden md:flex fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 items-center justify-between px-4 text-white z-50">
            {/* Left Section - Song Info */}
            <div className="flex items-center gap-4 w-1/4 min-w-0">
              <img
                src={song.thumbnail ? song.thumbnail : "/download.jpeg"}
                className="w-14 h-14 rounded object-cover"
                alt={song.title}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.album || song.description?.slice(0, 50) || "Unknown Album"}</p>
              </div>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
              </button>
            </div>

            {/* Center Section - Player Controls */}
            <div className="flex flex-col items-center gap-2 w-2/5 max-w-lg">
              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  className={`text-gray-400 hover:text-white transition-colors ${isShuffled ? 'text-green-500' : ''}`}
                  onClick={() => setIsShuffled(!isShuffled)}
                >
                  <FaRandom size={16} />
                </button>
                
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={prevSong}
                >
                  <GrChapterPrevious size={20} />
                </button>

                <button
                  className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                </button>

                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={nextSong}
                >
                  <GrChapterNext size={20} />
                </button>

                <button 
                  className={`text-gray-400 hover:text-white transition-colors ${isRepeated ? 'text-green-500' : ''}`}
                  onClick={() => setIsRepeated(!isRepeated)}
                >
                  <FaRedo size={16} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-gray-400 min-w-[35px]">
                  {formatTime(progress)}
                </span>
                <div className="flex-1 group">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                             [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0
                             group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity
                             [&::-webkit-slider-track]:bg-gray-600 [&::-webkit-slider-track]:rounded-lg [&::-webkit-slider-track]:h-1"
                    style={{
                      background: `linear-gradient(to right, #1db954 0%, #1db954 ${(progress / duration) * 100}%, #4f4f4f ${(progress / duration) * 100}%, #4f4f4f 100%)`
                    }}
                    value={(progress / duration) * 100 || 0}
                    onChange={durationChange}
                  />
                </div>
                <span className="text-xs text-gray-400 min-w-[35px]">
                  {formatTime(duration)}
                </span>
              </div>

              {song.audio && (
                <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
              )}
            </div>

            {/* Right Section - Volume & Additional Controls */}
            <div className="flex items-center gap-3 w-1/4 justify-end">
              <button className="text-gray-400 hover:text-white transition-colors">
                <HiOutlineQueueList size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                  {volume === 0 ? <HiOutlineSpeakerXMark size={20} /> : <HiOutlineSpeakerWave size={20} />}
                </button>
                <div className="w-20 group">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                             [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0
                             group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity"
                    style={{
                      background: `linear-gradient(to right, #1db954 0%, #1db954 ${volume * 100}%, #4f4f4f ${volume * 100}%, #4f4f4f 100%)`
                    }}
                    value={volume * 100}
                    onChange={volumeChange}
                  />
                </div>
              </div>

              <button className="text-gray-400 hover:text-white transition-colors">
                <BsPip size={16} />
              </button>
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <BsFullscreen size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white z-50">
            {/* Progress Bar at the very top */}
            <div className="w-full px-4 pt-1">
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-track]:bg-gray-600 [&::-webkit-slider-track]:rounded-lg [&::-webkit-slider-track]:h-1"
                style={{
                  background: `linear-gradient(to right, #1db954 0%, #1db954 ${(progress / duration) * 100}%, #4f4f4f ${(progress / duration) * 100}%, #4f4f4f 100%)`
                }}
                value={(progress / duration) * 100 || 0}
                onChange={durationChange}
              />
            </div>

            {/* Main player content */}
            <div className="flex items-center justify-between px-4 py-3">
              {/* Left Section - Song Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={song.thumbnail ? song.thumbnail : "/download.jpeg"}
                  className="w-12 h-12 rounded object-cover"
                  alt={song.title}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{song.title}</p>
                  <p className="text-xs text-gray-400 truncate">{song.album || song.description?.slice(0, 30) || "Unknown Album"}</p>
                </div>
              </div>

              {/* Right Section - Controls */}
              <div className="flex items-center gap-4 ml-4">
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? <FaHeart className="text-green-500" size={18} /> : <FaRegHeart size={18} />}
                </button>

                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={prevSong}
                >
                  <GrChapterPrevious size={24} />
                </button>

                <button
                  className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                </button>

                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={nextSong}
                >
                  <GrChapterNext size={24} />
                </button>
              </div>
            </div>

            {song.audio && (
              <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
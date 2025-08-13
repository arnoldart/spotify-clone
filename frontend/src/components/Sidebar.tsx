import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineArrowsExpand } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import PlayListCard from "./PlayListCard";
import { useUserData } from "../context/useUserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const [activeTab, setActiveTab] = useState("Playlists");

  const tabs = ["Playlists", "Artists", "Albums"];

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      {/* Top Navigation */}
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer hover:text-white text-gray-300 transition-colors"
          onClick={() => navigate("/")}
        >
          <img src="/home.png" alt="" className="w-6" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer hover:text-white text-gray-300 transition-colors">
          <img src="/search.png" alt="" className="w-6" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Your Library Section */}
      <div className="bg-[#121212] h-[85%] rounded flex flex-col">
        {/* Library Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/stack.png" className="w-8" alt="" />
            <p className="font-semibold text-gray-300">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlinePlus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <HiOutlineArrowsExpand className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Sort */}
        <div className="px-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiSearch className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Recents</span>
          </div>
          <MdSort className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Library Content */}
        <div className="flex-1 overflow-y-auto px-2 scrollbar-hover-minimal">
          {/* Liked Songs */}
          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
              <span className="text-white text-xl">♥</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Liked Songs</p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Playlist • 183 songs</span>
              </div>
            </div>
          </div>

          {/* Sample Playlists */}
          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <img 
              src="/download.jpeg" 
              alt="" 
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-white font-medium">Heart 2 Heart</p>
              <p className="text-sm text-gray-400">Playlist • Kenyang Berdendang</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <img 
              src="/download.jpeg" 
              alt="" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-white font-medium">Chevy</p>
              <p className="text-sm text-gray-400">Artist</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <img 
              src="/download.jpeg" 
              alt="" 
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-white font-medium">NANGIS AMPE MATA BENGK...</p>
              <p className="text-sm text-gray-400">Playlist • @radionangis</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <img 
              src="/download.jpeg" 
              alt="" 
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-white font-medium">Millennium Idol OST & Song (...</p>
              <p className="text-sm text-gray-400">Playlist • Autodidactic Studios</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded flex items-center justify-center">
              <span className="text-white text-lg">🔁</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">On Repeat</p>
              <p className="text-sm text-gray-400">Playlist • Spotify</p>
            </div>
          </div>

          {/* Original PlayListCard */}
          <div onClick={() => navigate("/playlist")} className="mt-4">
            <PlayListCard />
          </div>
        </div>

        {/* Podcast Section - Moved to bottom */}
        <div className="p-4 m-2 bg-[#242424] rounded font-semibold flex flex-col items-start gap-1 mt-4">
          <h1 className="text-white text-sm">Let's find some podcasts to follow</h1>
          <p className="font-light text-xs text-gray-400">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-black text-xs rounded-full mt-3 hover:bg-gray-200 transition-colors">
            Browse Podcasts
          </button>
        </div>

        {/* Admin Dashboard Button */}
        {user && user.role === "admin" && (
          <div className="p-4">
            <button
              className="w-full px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MdDelete,
  MdAdd,
  MdLibraryMusic,
  MdAlbum,
  MdHome,
  MdDashboard,
} from "react-icons/md";
import { FiMusic, FiImage } from "react-icons/fi";
import { useUserData } from "../context/useUserContext";
import { useSongData } from "../context/useSongContext";

const server = import.meta.env.VITE_ADMIN_SERVER_URL
const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "albums" | "songs">(
    "overview"
  );
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    setBtnLoading(true);
    try {
      const response = await fetch(`${server}/api/v1/album/new`, {
        method: "POST",
        headers: { token: localStorage.getItem("token") || "" },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      toast.success(data.message);
      fetchAlbums();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      setBtnLoading(false);
    }
  };
  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album", album);
    setBtnLoading(true);
    try {
      const response = await fetch(`${server}/api/v1/song/new`, {
        method: "POST",
        headers: { token: localStorage.getItem("token") || "" },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      setBtnLoading(false);
    }
  };
  const addThumbnailHandler = async (id: string) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setBtnLoading(true);
    try {
      const response = await fetch(`${server}/api/v1/song/${id}`, {
        method: "POST",
        headers: { token: localStorage.getItem("token") || "" },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      setBtnLoading(false);
    }
  };
  const deleteAlbum = async (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      setBtnLoading(true);
      try {
        const response = await fetch(`${server}/api/v1/album/${id}`, {
          method: "DELETE",
          headers: { token: localStorage.getItem("token") || "" },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }
        toast.success(data.message);
        fetchSongs();
        fetchAlbums();
        setBtnLoading(false);
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
        setBtnLoading(false);
      }
    }
  };
  const deleteSong = async (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      setBtnLoading(true);
      try {
        const response = await fetch(`${server}/api/v1/song/${id}`, {
          method: "DELETE",
          headers: { token: localStorage.getItem("token") || "" },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }
        toast.success(data.message);
        fetchSongs();
        setBtnLoading(false);
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
        setBtnLoading(false);
      }
    }
  };
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {" "}
      {/* Header */}{" "}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        {" "}
        <div className="max-w-7xl mx-auto px-6 py-4">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <div className="flex items-center gap-4">
              {" "}
              <MdDashboard className="text-green-500 text-3xl" />{" "}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Admin Dashboard{" "}
              </h1>{" "}
            </div>{" "}
            <Link
              to="/"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
            >
              {" "}
              <MdHome /> Home{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {" "}
        {/* Stats Cards */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {" "}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-2xl shadow-lg">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <p className="text-purple-200 text-sm">Total Albums</p>{" "}
                <p className="text-3xl font-bold text-white">
                  {albums?.length || 0}
                </p>{" "}
              </div>{" "}
              <MdAlbum className="text-4xl text-purple-200" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <p className="text-blue-200 text-sm">Total Songs</p>{" "}
                <p className="text-3xl font-bold text-white">
                  {songs?.length || 0}
                </p>{" "}
              </div>{" "}
              <FiMusic className="text-4xl text-blue-200" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-2xl shadow-lg">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <p className="text-green-200 text-sm">Library Items</p>{" "}
                <p className="text-3xl font-bold text-white">
                  {(albums?.length || 0) + (songs?.length || 0)}
                </p>{" "}
              </div>{" "}
              <MdLibraryMusic className="text-4xl text-green-200" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Navigation Tabs */}{" "}
        <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl mb-8">
          {" "}
          {[
            { id: "overview", label: "Overview", icon: MdDashboard },
            { id: "albums", label: "Manage Albums", icon: MdAlbum },
            { id: "songs", label: "Manage Songs", icon: FiMusic },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {" "}
              <tab.icon /> {tab.label}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        {/* Tab Content */}{" "}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {" "}
            <div className="text-center py-12">
              {" "}
              <MdDashboard className="text-6xl text-green-500 mx-auto mb-4" />{" "}
              <h2 className="text-3xl font-bold mb-2">
                Welcome to Admin Dashboard
              </h2>{" "}
              <p className="text-gray-400 max-w-2xl mx-auto">
                {" "}
                Manage your music library efficiently. Add new albums, upload
                songs, and organize your content all in one place.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {" "}
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                {" "}
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {" "}
                  <MdAlbum className="text-purple-500" /> Recent Albums{" "}
                </h3>{" "}
                <div className="space-y-3">
                  {" "}
                  {albums?.slice(0, 3).map((album, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg"
                    >
                      {" "}
                      <img
                        src={album.thumbnail}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt=""
                      />{" "}
                      <div>
                        {" "}
                        <p className="font-medium">{album.title}</p>{" "}
                        <p className="text-sm text-gray-400">
                          {album.description}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                {" "}
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {" "}
                  <FiMusic className="text-blue-500" /> Recent Songs{" "}
                </h3>{" "}
                <div className="space-y-3">
                  {" "}
                  {songs?.slice(0, 3).map((song, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg"
                    >
                      {" "}
                      {song.thumbnail ? (
                        <img
                          src={song.thumbnail}
                          className="w-12 h-12 rounded-lg object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          {" "}
                          <FiMusic className="text-white" />{" "}
                        </div>
                      )}{" "}
                      <div>
                        {" "}
                        <p className="font-medium">{song.title}</p>{" "}
                        <p className="text-sm text-gray-400">
                          {song.description}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {activeTab === "albums" && (
          <div className="space-y-8">
            {" "}
            {/* Add Album Form */}{" "}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              {" "}
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                {" "}
                <MdAdd className="text-green-500" /> Add New Album{" "}
              </h2>{" "}
              <form
                onSubmit={addAlbumHandler}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {" "}
                <div className="space-y-4">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Album Title
                    </label>{" "}
                    <input
                      type="text"
                      placeholder="Enter album title"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>{" "}
                    <textarea
                      placeholder="Enter album description"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-4">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Album Cover
                    </label>{" "}
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      {" "}
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-2" />{" "}
                      <input
                        type="file"
                        onChange={fileChangeHandler}
                        className="hidden"
                        accept="image/*"
                        id="album-cover"
                        required
                      />
                      <label htmlFor="album-cover" className="cursor-pointer">
                        <span className="text-green-500 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-400"> or drag and drop</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={btnLoading}
                  >
                    {btnLoading ? "Creating Album..." : "Create Album"}
                  </button>
                </div>
              </form>
            </div>
            {/* Albums Grid */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MdAlbum className="text-purple-500" />
                All Albums ({albums?.length || 0})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {albums?.map((album, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/50 p-4 rounded-xl hover:bg-gray-700 transition-colors group"
                  >
                    <div className="relative mb-4">
                      <img
                        src={album.thumbnail}
                        className="w-full aspect-square rounded-lg object-cover"
                        alt=""
                      />
                      <button
                        onClick={() => deleteAlbum(album.id)}
                        disabled={btnLoading}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 disabled:opacity-50"
                      >
                        <MdDelete />
                      </button>
                    </div>
                    <h4 className="font-semibold text-white mb-1 truncate">
                      {album.title}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {album.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === "songs" && (
          <div className="space-y-8">
            {/* Add Song Form */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MdAdd className="text-blue-500" />
                Add New Song
              </h2>
              <form
                onSubmit={addSongHandler}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Song Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter song title"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter song description"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Album
                    </label>
                    <select
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={album}
                      onChange={(e) => setAlbum(e.target.value)}
                      required
                    >
                      <option value="">Choose Album</option>
                      {albums?.map((album, i) => (
                        <option value={album.id} key={i}>
                          {album.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Audio File
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <FiMusic className="text-4xl text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        onChange={fileChangeHandler}
                        className="hidden"
                        accept="audio/*"
                        id="song-audio"
                        required
                      />
                      <label htmlFor="song-audio" className="cursor-pointer">
                        <span className="text-blue-500 font-medium">
                          Click to upload audio
                        </span>
                        <span className="text-gray-400"> or drag and drop</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={btnLoading}
                  >
                    {btnLoading ? "Uploading Song..." : "Upload Song"}
                  </button>
                </div>
              </form>
            </div>

            {/* Songs Grid */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiMusic className="text-blue-500" />
                All Songs ({songs?.length || 0})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs?.map((song, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/50 p-4 rounded-xl hover:bg-gray-700 transition-colors group"
                  >
                    <div className="relative mb-4">
                      {song.thumbnail ? (
                        <img
                          src={song.thumbnail}
                          className="w-full aspect-square rounded-lg object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex flex-col items-center justify-center gap-2">
                          <FiMusic className="text-white text-3xl" />
                          <div className="text-center px-2">
                            <input
                              type="file"
                              onChange={fileChangeHandler}
                              className="hidden"
                              id={`thumbnail-${song.id}`}
                              accept="image/*"
                            />
                            <label
                              htmlFor={`thumbnail-${song.id}`}
                              className="text-xs text-white cursor-pointer hover:underline"
                            >
                              Add Cover
                            </label>
                            <button
                              className="block w-full text-xs bg-white text-blue-600 px-2 py-1 rounded mt-1 hover:bg-gray-100 transition-colors"
                              disabled={btnLoading}
                              onClick={() => addThumbnailHandler(song.id)}
                            >
                              {btnLoading ? "Uploading..." : "Upload"}
                            </button>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => deleteSong(song.id)}
                        disabled={btnLoading}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 disabled:opacity-50"
                      >
                        <MdDelete />
                      </button>
                    </div>
                    <h4 className="font-semibold text-white mb-1 truncate">
                      {song.title}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {song.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

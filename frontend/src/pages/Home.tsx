// import AlbumCard from "../components/AlbumCard";
import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/useSongContext";
// import { useSongData } from "../context/useSongContext";
// import SongCard from "../components/SongCard";

const Home = () => {
  const { loading, songs, albums } = useSongData();
  // let loading = true;
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
              {albums?.map((e, i) => {
                return (
                  <AlbumCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto">
              {songs?.map((e, i) => {
                return (
                  <SongCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                );
              })}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Home;
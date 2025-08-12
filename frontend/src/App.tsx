import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import { useUserData } from "./context/UserContext";
// import Loading from "./components/Loading";
// import Register from "./pages/Register";
// import Album from "./pages/Album";
// import PlayList from "./pages/PlayList";
// import Admin from "./pages/Admin";

const App = () => {
  // const { isAuth, loading } = useUserData();
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
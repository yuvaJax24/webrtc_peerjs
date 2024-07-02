import { Route, Routes } from "react-router-dom";
import MainPage from "../pages";
import CreateRoom from "../pages/room/create";
import JoinRoom from "../pages/room/join";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/room/:id" element={<CreateRoom />} />
      <Route path="/room/:id" element={<JoinRoom />} />
    </Routes>
  );
};

export default MainRoutes;

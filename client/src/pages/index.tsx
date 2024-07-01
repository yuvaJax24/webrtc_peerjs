import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  return (
    <div>
      <button onClick={() => navigate("/room")}>Create Room</button>
      <p>Join using Room ID</p>
      <input
        className="border-[1px] border-solid border-black rounded-[4px] p-1"
        type="text"
        name="roomId"
        placeholder="EnterRoom ID..."
        onChange={(event) => setRoomId(event?.target?.value)}
      />
      <button onClick={() => navigate(`/room/${roomId}`)} disabled={!roomId}>
        Join Room
      </button>
    </div>
  );
};

export default MainPage;

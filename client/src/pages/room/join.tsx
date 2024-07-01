import { useParams } from "react-router-dom";
import CreateRoom from "./create";

const JoinRoom = () => {
  const params = useParams();
  const roomId = params.id;

  return <CreateRoom room_Id={roomId as string} />;
};

export default JoinRoom;

import { useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

const CreateRoom = ({ room_Id }: { room_Id: string }) => {
  const myVideoRef: any = useRef(null);
  const roomId = room_Id || uuidV4();

  const addVideoStream = (video: any, stream: any) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  };

  const setMyVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideoRef?.current, stream);
      });
  };

  useEffect(() => {
    setMyVideoStream();
  }, []);

  return (
    <div className="w-full h-full p-8">
      <p className="text-center">Room</p>
      <p className="text-center">Room Id: {roomId}</p>
      <div className="w-full flex items-center flex-wrap mt-8">
        <video width="30%" height="30%" ref={myVideoRef} muted />
      </div>
    </div>
  );
};

export default CreateRoom;

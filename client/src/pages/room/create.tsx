/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Peer } from "peerjs";
import { useParams } from "react-router-dom";

const CreateRoom = ({ room_Id }: { room_Id?: string }) => {
  const params = useParams();
  const myVideoRef: any = useRef(null);
  const userVideoRef: any = useRef(null);
  const [videoStream, setVideoStream] = useState<any>(null);
  const [peers, setPeers] = useState<any[]>([]);
  const [webSocket, setWebSocket] = useState<Socket>();
  const roomId = params?.id || room_Id;
  const myPeer = new Peer("", {
    host: "/",
    port: 3001,
  });

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
        setVideoStream(stream);
        addVideoStream(myVideoRef?.current, stream);
      });
  };

  function connectToNewUser(userId: string, stream: any) {
    const call = myPeer.call(userId, stream);
    call.on("stream", (userVideoStream) => {
      addVideoStream(userVideoRef?.current, userVideoStream);
    });
    call.on("close", () => {
      userVideoRef?.current.remove();
    });
    setPeers({
      ...peers,
      [userId]: call,
    });
  }

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    setWebSocket(socket);
    setMyVideoStream();
  }, []);

  useEffect(() => {
    if (webSocket) {
      myPeer.on("open", (id) => {
        console.log("object1", roomId, id);
        webSocket.emit("join-room", roomId, id);
      });
      myPeer.on("call", (call) => {
        call.answer(videoStream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(myVideoRef?.current, userVideoStream);
        });
      });
      // socket.emit("connection-request");
      webSocket.on("user-connected", (userId) => {
        console.log("object2", userId);
        connectToNewUser(userId, videoStream);
      });
      webSocket.on("user-disconnected", (userId) => {
        if (peers[userId]) peers[userId].close();
      });
    }
  }, [webSocket, videoStream, peers]);

  return (
    <div className="w-full h-full p-8">
      <p className="text-center">Room</p>
      <p className="text-center">Room Id: {roomId}</p>
      <div className="w-full flex items-center flex-wrap gap-6 mt-8">
        <video width="30%" height="30%" ref={myVideoRef} muted />
        <video width="30%" height="30%" ref={userVideoRef} muted />
      </div>
    </div>
  );
};

export default CreateRoom;

import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatWindow from "../components/chatWindow";

export default function Room() {

  const { socket } = useOutletContext();
  const params = useParams();

  useEffect(() => {
    if(!socket) return;

    socket.emit("join-room", { roomId: params.roomId });
  }, [socket, params]);

  return <ChatWindow />
}

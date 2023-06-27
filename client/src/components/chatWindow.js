import React from "react";
import {
  Box,
  Card,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function ChatWindow() {
  const { socket } = useOutletContext();
  const { roomId } = useParams();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, settypingTimeout] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, recieved: true }]);
    });

    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]);

  function handleSubmit(e) {
    if (!socket) throw new Error();
    e.preventDefault();
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message, recieved: false }]);
    setMessage("");
  }

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started");

    if (typingTimeout) clearTimeout(typingTimeout);

    settypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped");
      }, 1000)
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: "60%",
          backgroundColor: "grey",
        }}
      >
        <Container>
            {roomId && <Typography>Room: {roomId}</Typography>}
          <Box sx={{ marginBlock: 5 }}>
            {chat.map((data) => {
              return (
                <Typography
                  sx={{ textAlign: data.recieved ? "left" : "right" }}
                  key={data.message}
                >
                  {data.message}
                </Typography>
              );
            })}
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {typing && (
              <InputLabel shrink sx={{ color: "white" }}>
                Typing...
              </InputLabel>
            )}

            <OutlinedInput
              sx={{ backgroundColor: "white" }}
              fullWidth
              id="message-input"
              value={message}
              onChange={handleInput}
              placeholder="Write your message"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" onClick={handleSubmit} edge="end">
                    {" "}
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Container>
      </Card>
    </Box>
  );
}

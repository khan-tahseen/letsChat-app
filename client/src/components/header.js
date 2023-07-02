import { Box, Button, Card } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Header() {
  const navigate = useNavigate();

  const createNewRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    console.log("Creating new room");
  };

  return (
    <Card sx={{ margin: 8, backgroundColor: "grey" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link to="/">
            <Button sx={{ color: "white" }}>Home</Button>
          </Link>
          {/* <Link to={`/room/${roomId}`}>
        <Button sx={{ color: "white" }}>Room</Button>
      </Link> */}
        </Box>
        <Button sx={{ color: "white" }} onClick={createNewRoom}>
          New Room
        </Button>
      </Box>
    </Card>
  );
}

import { Button, Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

export default function Header() {

    const roomId = uuidv4();

  return (
    <Card sx={{ margin: 8, backgroundColor: "grey" }}>
      <Link to="/">
        <Button sx={{ color: "white" }}>Home</Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: "white" }}>Chats</Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button sx={{color:"white"}} >Room</Button>
      </Link>
    </Card>
  );
}

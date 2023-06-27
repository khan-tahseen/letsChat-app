import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);

  return (
    <div>
      <Header />
      <Outlet context={{ socket }} />
    </div>
  );
}

export default App;

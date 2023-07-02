export default class RoomController {
  socket;
  constructor(socket) {
    this.socket = socket;
  }

  joinRoom = ({ roomId }) => {
     this.socket.join(roomId);
  }; 
}
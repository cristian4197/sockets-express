import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}

// Escucha de mensajes desde el cliente
export const message = (client: Socket, io: socketIO.Server) => {
  client.on('messageEvent', (payload: { from: string, message: string }, callback) => {
    console.log(`Mensaje recibido con data: ${JSON.stringify(payload)}`);

    // Emitimos el mensaje a todos los usuarios conectados a la app de sockets
    // new-message es el nombre que tambien esta en nuestro front
    io.emit('new-message', payload);
  });
};

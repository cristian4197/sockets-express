import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
// Importamos todo *
import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  // Propiedad encargada de emitir y escuchar eventos
  public io: socketIO.Server;
  private httpServer: http.Server;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } })
    this.listenSockets();
  }

  public static get instance():Server {
    return this._instance ? this._instance : this._instance = new Server();
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }

  private listenSockets(): void {
    console.log('Escuchando conexiones');
    this.io.on('connection', (client) => {
      console.log('Nuevo cliente conectado');

      // Escuchar evento desde cliente
      socket.message(client, this.io);
      //Validar desconección de cliente
      socket.disconnect(client);
    });

  }
}
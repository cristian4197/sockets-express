import Server from "./class/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const server = new Server();

//Configuramos el bodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Cors
// Permito que cualquier cliente pueda llamar mis servicios
server.app.use(cors({ origin: true, credentials: true }));

// Rutas
server.app.use('/', router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
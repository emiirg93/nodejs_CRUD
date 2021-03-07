import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        // definir mis rutas
        this.routes();
    }

    // Conectar base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (err) {
            throw new Error(err);
        }

    }
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta Publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;
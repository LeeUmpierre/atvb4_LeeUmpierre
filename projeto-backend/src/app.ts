import express from 'express';
import cors from 'cors';
import {createServer, Server} from 'http';
import socketIO from 'socket.io';

import localizacaoRoute from './route/localizacao.route'
import usuarioRoute from './route/usuario.route'
import passagemRoute from './route/passagem.route'
import hotelRoute from './route/hotel.route'
import reviewRoute from './route/review.route'

export class App {
    private express: express.Application;
    private io: socketIO.Server;

    public server: Server;

    constructor() {
        this.express = express();

        this.middleware();
        this.socket();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private socket(): void {
        this.server = createServer( this.express );
        //this.io = socketIO(this.server);
    }

    private routes(): void {
        this.express.use((req, res, next) => {
            req.io = this.io;
            
            next();
        });

        this.express.use('/localizacoes', localizacaoRoute);
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/passagens', passagemRoute);
        this.express.use('/hoteis', hotelRoute);
        this.express.use('/reviews', reviewRoute);
    }

}

export default new App();
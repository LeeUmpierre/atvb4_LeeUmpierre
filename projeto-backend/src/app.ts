import express from 'express';
import cors from 'cors';

import localizacaoRoute from './route/localizacao.route'
import usuarioRoute from './route/usuario.route'
import passagemRoute from './route/passagem.route'
import hotelRoute from './route/hotel.route'
import reviewRoute from './route/review.route'

export class App {
    public express: express.Application;

    constructor(){
        this.express = express();

        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }
    private routes(): void {

        this.express.use('/localizacoes', localizacaoRoute);
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/passagens', passagemRoute);
        this.express.use('/hoteis', hotelRoute);
        this.express.use('/reviews', reviewRoute);
    }

}

export default new App().express;
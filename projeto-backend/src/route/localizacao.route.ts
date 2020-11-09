import { Router } from 'express';
import localizacaoController from '../controller/localizacao.controller'

class LocalizacaoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de localizacao
        this.init();
    }

    private init(): void {

        this.router.route ('/')
        .get(localizacaoController.findAll)
        .post(localizacaoController.create)
        
        this.router.route ('/:id([0-9]+)')
        .get(localizacaoController.findByID)
        .put(localizacaoController.update)
        .delete(localizacaoController.delete)

    }

}

export default new LocalizacaoRoute().router;
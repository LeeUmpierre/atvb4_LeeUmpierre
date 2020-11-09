import { Router } from 'express';
import passagemController from '../controller/passagem.controller'

class PassagemRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de passagem
        this.init();
    }

    private init(): void {

        this.router.route ('/')
        .get(passagemController.findAll)
        .post(passagemController.create)
        
        this.router.route ('/:id([0-9]+)')
        .get(passagemController.findByID)
        .put(passagemController.update)
        .delete(passagemController.delete)

    }

}

export default new PassagemRoute().router;
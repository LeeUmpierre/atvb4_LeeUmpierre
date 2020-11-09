import { Router } from 'express';
import usuarioController from '../controller/usuario.controller'

class UsuarioRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de usuario
        this.init();
    }

    private init(): void {

        this.router.route ('/')
        .get(usuarioController.findAll)
        .post(usuarioController.create)
        
        this.router.route ('/:id([0-9]+)')
        .get(usuarioController.findByID)
        .put(usuarioController.update)
        .delete(usuarioController.delete)

    }

}

export default new UsuarioRoute().router;
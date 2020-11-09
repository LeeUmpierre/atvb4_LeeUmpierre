import { Router } from 'express';
import reviewController from '../controller/review.controller'

class ReviewRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de review
        this.init();
    }

    private init(): void {

        this.router.route ('/')
        .get(reviewController.findAll)
        .post(reviewController.create)
        
        this.router.route ('/:id([0-9]+)')
        .get(reviewController.findByID)
        .put(reviewController.update)
        .delete(reviewController.delete)

    }

}

export default new ReviewRoute().router;
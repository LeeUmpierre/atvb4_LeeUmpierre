import { Router } from 'express';
import hotelController from '../controller/hotel.controller'

class HotelRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de hotel
        this.init();
    }

    private init(): void {

        this.router.route ('/')
        .get(hotelController.findAll)
        .post(hotelController.create)
        
        this.router.route ('/:id([0-9]+)')
        .get(hotelController.findByID)
        .put(hotelController.update)
        .delete(hotelController.delete)

    }

}

export default new HotelRoute().router;
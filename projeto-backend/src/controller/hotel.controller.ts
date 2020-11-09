import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MessageChannel } from "worker_threads";
import { HotelEntity } from "../entity/hotel.entity";

class HotelController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const hoteis: HotelEntity[] = await getRepository(HotelEntity).find();
            res.send(hoteis);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const hotel = req.body;

        try {

            await getRepository(HotelEntity).save( hotel );
            res.status(201).send(hotel);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar registro pela ID
            const hotel = await getRepository(HotelEntity).findOne(id);

            //Se n encontrar hotel devolve erro 404
            if (hotel) {
                res.send(hotel);
            } else {
                res.status(404).send({message: 'Not Found'});
            }
            const hoteis: HotelEntity[] = await getRepository(HotelEntity).find();
            res.send(hoteis);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar registro pela ID
            const hotel = await getRepository(HotelEntity).findOne(id);

            //Se n encontrar hotel devolve erro 404
            if (hotel) {
                //Atualizar registro
                await getRepository(HotelEntity).update(hotel.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = hotel.id;

                res.send(novo);

            } else {
                res.status(404).send({message: 'Not Found'});
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }
    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar registro pela ID
            const hotel = await getRepository(HotelEntity).findOne(id);

            if (hotel) {
                await getRepository(HotelEntity).delete(id);

                res.status(204).send();
            } else {
                res.status(404).send({message: 'Not Found'});
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new HotelController();
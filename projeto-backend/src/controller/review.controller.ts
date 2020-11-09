import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MessageChannel } from "worker_threads";
import { ReviewEntity } from "../entity/review.entity";

class ReviewController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const reviews: ReviewEntity[] = await getRepository(ReviewEntity).find();
            res.send(reviews);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const review = req.body;

        try {

            await getRepository(ReviewEntity).save( review );
            res.status(201).send(review);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar registro pela ID
            const review = await getRepository(ReviewEntity).findOne(id);

            //Se n encontrar review devolve erro 404
            if (review) {
                res.send(review);
            } else {
                res.status(404).send({message: 'Not Found'});
            }
            const reviews: ReviewEntity[] = await getRepository(ReviewEntity).find();
            res.send(reviews);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar registro pela ID
            const review = await getRepository(ReviewEntity).findOne(id);

            //Se n encontrar review devolve erro 404
            if (review) {
                //Atualizar registro
                await getRepository(ReviewEntity).update(review.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = review.id;

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
            const review = await getRepository(ReviewEntity).findOne(id);

            if (review) {
                await getRepository(ReviewEntity).delete(id);

                res.status(204).send();
            } else {
                res.status(404).send({message: 'Not Found'});
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new ReviewController();
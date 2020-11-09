import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MessageChannel } from "worker_threads";
import { PassagemEntity } from "../entity/passagem.entity";

class PassagemController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const passagens: PassagemEntity[] = await getRepository(PassagemEntity).find();
            res.send(passagens);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const passagem = req.body;

        try {

            await getRepository(PassagemEntity).save( passagem );
            res.status(201).send(passagem);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar registro pela ID
            const passagem = await getRepository(PassagemEntity).findOne(id);

            //Se n encontrar passagem devolve erro 404
            if (passagem) {
                res.send(passagem);
            } else {
                res.status(404).send({message: 'Not Found'});
            }
            const passagens: PassagemEntity[] = await getRepository(PassagemEntity).find();
            res.send(passagens);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar registro pela ID
            const passagem = await getRepository(PassagemEntity).findOne(id);

            //Se n encontrar passagem devolve erro 404
            if (passagem) {
                //Atualizar registro
                await getRepository(PassagemEntity).update(passagem.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = passagem.id;

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
            const passagem = await getRepository(PassagemEntity).findOne(id);

            if (passagem) {
                await getRepository(PassagemEntity).delete(id);

                res.status(204).send();
            } else {
                res.status(404).send({message: 'Not Found'});
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new PassagemController();
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MessageChannel } from "worker_threads";
import { LocalizacaoEntity } from "../entity/localizacao.entity";

class LocalizacaoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const localizacoes: LocalizacaoEntity[] = await getRepository(LocalizacaoEntity).find();
            res.send(localizacoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const localizacao = req.body;

        try {

            await getRepository(LocalizacaoEntity).save( localizacao );
            res.status(201).send(localizacao);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar registro pela ID
            const localizacao = await getRepository(LocalizacaoEntity).findOne(id);

            //Se n encontrar localizacao devolve erro 404
            if (localizacao) {
                res.send(localizacao);
            } else {
                res.status(404).send({message: 'Not Found'});
            }
            const localizacoes: LocalizacaoEntity[] = await getRepository(LocalizacaoEntity).find();
            res.send(localizacoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar registro pela ID
            const localizacao = await getRepository(LocalizacaoEntity).findOne(id);

            //Se n encontrar localizacao devolve erro 404
            if (localizacao) {
                //Atualizar registro
                await getRepository(LocalizacaoEntity).update(localizacao.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = localizacao.id;

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
            const localizacao = await getRepository(LocalizacaoEntity).findOne(id);

            if (localizacao) {
                await getRepository(LocalizacaoEntity).delete(id);

                res.status(204).send();
            } else {
                res.status(404).send({message: 'Not Found'});
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new LocalizacaoController();
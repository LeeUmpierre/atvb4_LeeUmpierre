"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const passagem_entity_1 = require("../entity/passagem.entity");
class PassagemController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passagens = yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).find();
                res.send(passagens);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passagem = req.body;
            try {
                yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).save(passagem);
                res.status(201).send(passagem);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                //Buscar registro pela ID
                const passagem = yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).findOne(id);
                //Se n encontrar passagem devolve erro 404
                if (passagem) {
                    res.send(passagem);
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
                const passagens = yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).find();
                res.send(passagens);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const novo = req.body;
            try {
                //Buscar registro pela ID
                const passagem = yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).findOne(id);
                //Se n encontrar passagem devolve erro 404
                if (passagem) {
                    //Atualizar registro
                    yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).update(passagem.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = passagem.id;
                    res.send(novo);
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                //Buscar registro pela ID
                const passagem = yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).findOne(id);
                if (passagem) {
                    yield typeorm_1.getRepository(passagem_entity_1.PassagemEntity).delete(id);
                    res.status(204).send();
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new PassagemController();
//# sourceMappingURL=passagem.controller.js.map
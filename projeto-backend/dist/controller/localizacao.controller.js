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
const localizacao_entity_1 = require("../entity/localizacao.entity");
class LocalizacaoController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const localizacoes = yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).find();
                res.send(localizacoes);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizacao = req.body;
            try {
                yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).save(localizacao);
                res.status(201).send(localizacao);
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
                const localizacao = yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).findOne(id);
                //Se n encontrar localizacao devolve erro 404
                if (localizacao) {
                    res.send(localizacao);
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
                const localizacoes = yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).find();
                res.send(localizacoes);
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
                const localizacao = yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).findOne(id);
                //Se n encontrar localizacao devolve erro 404
                if (localizacao) {
                    //Atualizar registro
                    yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).update(localizacao.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = localizacao.id;
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
                const localizacao = yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).findOne(id);
                if (localizacao) {
                    yield typeorm_1.getRepository(localizacao_entity_1.LocalizacaoEntity).delete(id);
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
exports.default = new LocalizacaoController();
//# sourceMappingURL=localizacao.controller.js.map
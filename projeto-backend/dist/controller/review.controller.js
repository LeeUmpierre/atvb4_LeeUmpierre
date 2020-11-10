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
const review_entity_1 = require("../entity/review.entity");
class ReviewController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield typeorm_1.getRepository(review_entity_1.ReviewEntity).find();
                res.send(reviews);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = req.body;
            try {
                yield typeorm_1.getRepository(review_entity_1.ReviewEntity).save(review);
                res.status(201).send(review);
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
                const review = yield typeorm_1.getRepository(review_entity_1.ReviewEntity).findOne(id);
                //Se n encontrar review devolve erro 404
                if (review) {
                    res.send(review);
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
                const reviews = yield typeorm_1.getRepository(review_entity_1.ReviewEntity).find();
                res.send(reviews);
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
                const review = yield typeorm_1.getRepository(review_entity_1.ReviewEntity).findOne(id);
                //Se n encontrar review devolve erro 404
                if (review) {
                    //Atualizar registro
                    yield typeorm_1.getRepository(review_entity_1.ReviewEntity).update(review.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = review.id;
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
                const review = yield typeorm_1.getRepository(review_entity_1.ReviewEntity).findOne(id);
                if (review) {
                    yield typeorm_1.getRepository(review_entity_1.ReviewEntity).delete(id);
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
exports.default = new ReviewController();
//# sourceMappingURL=review.controller.js.map
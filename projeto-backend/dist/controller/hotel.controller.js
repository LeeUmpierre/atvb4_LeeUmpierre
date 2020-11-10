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
const hotel_entity_1 = require("../entity/hotel.entity");
class HotelController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hoteis = yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).find();
                res.send(hoteis);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotel = req.body;
            try {
                yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).save(hotel);
                res.status(201).send(hotel);
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
                const hotel = yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).findOne(id);
                //Se n encontrar hotel devolve erro 404
                if (hotel) {
                    res.send(hotel);
                }
                else {
                    res.status(404).send({ message: 'Not Found' });
                }
                const hoteis = yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).find();
                res.send(hoteis);
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
                const hotel = yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).findOne(id);
                //Se n encontrar hotel devolve erro 404
                if (hotel) {
                    //Atualizar registro
                    yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).update(hotel.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = hotel.id;
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
                const hotel = yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).findOne(id);
                if (hotel) {
                    yield typeorm_1.getRepository(hotel_entity_1.HotelEntity).delete(id);
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
exports.default = new HotelController();
//# sourceMappingURL=hotel.controller.js.map
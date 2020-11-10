"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_1 = __importDefault(require("../controller/hotel.controller"));
class HotelRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de hotel
        this.init();
    }
    init() {
        this.router.route('/')
            .get(hotel_controller_1.default.findAll)
            .post(hotel_controller_1.default.create);
        this.router.route('/:id([0-9]+)')
            .get(hotel_controller_1.default.findByID)
            .put(hotel_controller_1.default.update)
            .delete(hotel_controller_1.default.delete);
    }
}
exports.default = new HotelRoute().router;
//# sourceMappingURL=hotel.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passagem_controller_1 = __importDefault(require("../controller/passagem.controller"));
class PassagemRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de passagem
        this.init();
    }
    init() {
        this.router.route('/')
            .get(passagem_controller_1.default.findAll)
            .post(passagem_controller_1.default.create);
        this.router.route('/:id([0-9]+)')
            .get(passagem_controller_1.default.findByID)
            .put(passagem_controller_1.default.update)
            .delete(passagem_controller_1.default.delete);
    }
}
exports.default = new PassagemRoute().router;
//# sourceMappingURL=passagem.route.js.map
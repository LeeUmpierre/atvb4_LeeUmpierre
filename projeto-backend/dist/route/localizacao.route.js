"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localizacao_controller_1 = __importDefault(require("../controller/localizacao.controller"));
class LocalizacaoRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de localizacao
        this.init();
    }
    init() {
        this.router.route('/')
            .get(localizacao_controller_1.default.findAll)
            .post(localizacao_controller_1.default.create);
        this.router.route('/:id([0-9]+)')
            .get(localizacao_controller_1.default.findByID)
            .put(localizacao_controller_1.default.update)
            .delete(localizacao_controller_1.default.delete);
    }
}
exports.default = new LocalizacaoRoute().router;
//# sourceMappingURL=localizacao.route.js.map
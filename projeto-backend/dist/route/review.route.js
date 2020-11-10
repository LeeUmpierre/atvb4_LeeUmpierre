"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = __importDefault(require("../controller/review.controller"));
class ReviewRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de review
        this.init();
    }
    init() {
        this.router.route('/')
            .get(review_controller_1.default.findAll)
            .post(review_controller_1.default.create);
        this.router.route('/:id([0-9]+)')
            .get(review_controller_1.default.findByID)
            .put(review_controller_1.default.update)
            .delete(review_controller_1.default.delete);
    }
}
exports.default = new ReviewRoute().router;
//# sourceMappingURL=review.route.js.map
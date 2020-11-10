"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const localizacao_route_1 = __importDefault(require("./route/localizacao.route"));
const usuario_route_1 = __importDefault(require("./route/usuario.route"));
const passagem_route_1 = __importDefault(require("./route/passagem.route"));
const hotel_route_1 = __importDefault(require("./route/hotel.route"));
const review_route_1 = __importDefault(require("./route/review.route"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    routes() {
        this.express.use('/localizacoes', localizacao_route_1.default);
        this.express.use('/usuarios', usuario_route_1.default);
        this.express.use('/passagens', passagem_route_1.default);
        this.express.use('/hoteis', hotel_route_1.default);
        this.express.use('/reviews', review_route_1.default);
    }
}
exports.App = App;
exports.default = new App().express;
//# sourceMappingURL=app.js.map
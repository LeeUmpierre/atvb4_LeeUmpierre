"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
const typeorm_1 = require("typeorm");
const localizacao_entity_1 = require("./localizacao.entity");
let UsuarioEntity = class UsuarioEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsuarioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, length: 50 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, length: 50 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.ManyToOne(type => localizacao_entity_1.LocalizacaoEntity, { eager: true, nullable: false }),
    __metadata("design:type", localizacao_entity_1.LocalizacaoEntity)
], UsuarioEntity.prototype, "cidade", void 0);
UsuarioEntity = __decorate([
    typeorm_1.Entity({ name: 'usuario' })
], UsuarioEntity);
exports.UsuarioEntity = UsuarioEntity;
//# sourceMappingURL=usuario.entity.js.map
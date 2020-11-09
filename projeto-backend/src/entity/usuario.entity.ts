import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalizacaoEntity } from "./localizacao.entity";

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 50})
    email: string;

    @ManyToOne( type => LocalizacaoEntity, {eager: true, nullable: false})
    cidade: LocalizacaoEntity;
}
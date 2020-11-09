import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalizacaoEntity } from "./localizacao.entity";

@Entity({name: 'passagem'})
export class PassagemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'float'})
    valor: number;

    @Column({nullable: false, length: 6})
    dia: string;

    @Column({nullable: false, length: 50})
    hora: string;

    @ManyToOne( type => LocalizacaoEntity, {eager: true, nullable: true})
    localizacao: LocalizacaoEntity;

}
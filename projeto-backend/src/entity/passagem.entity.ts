import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { LocalizacaoEntity } from "./localizacao.entity";

@Entity({name: 'passagem'})
export class PassagemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'float'})
    valor: number;
    
    @Column({nullable: false, type: 'date'})
    dia: Date;

    @Column({nullable: false, type: 'timestamp'})
    hora: Date;

    @ManyToOne( type => LocalizacaoEntity, {eager: true, nullable: true})
    localizacao: LocalizacaoEntity;

}
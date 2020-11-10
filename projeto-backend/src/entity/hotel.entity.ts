import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalizacaoEntity } from "./localizacao.entity";

@Entity({name: 'hotel'})
export class HotelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'date'})
    checkin: Date;

    @Column({nullable: false, type: 'date'})
    checkout: Date;

    @Column({nullable: false, type: 'float'})
    valor: number;

    @ManyToOne( type => LocalizacaoEntity, {eager: true, nullable: true})
    localizacao: LocalizacaoEntity;

}
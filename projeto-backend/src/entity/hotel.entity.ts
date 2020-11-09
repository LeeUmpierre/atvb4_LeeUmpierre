import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalizacaoEntity } from "./localizacao.entity";

@Entity({name: 'hotel'})
export class HotelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    checkin: string;

    @Column({nullable: false, length: 50})
    checkout: string;

    @Column({nullable: false, type: 'float'})
    valor: number;

    @ManyToOne( type => LocalizacaoEntity, {eager: true, nullable: true})
    localizacao: LocalizacaoEntity;

}
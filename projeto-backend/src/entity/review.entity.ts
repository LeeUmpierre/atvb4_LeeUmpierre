import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'review'})
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 300})
    comentario: string;

    @Column({nullable: false, type: 'integer'})
    avaliacao: number;

    @ManyToOne( type => HotelEntity, {eager: true, nullable: false})
    hotel: HotelEntity;

    @ManyToOne( type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'localizacao'})
export class LocalizacaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 2})
    uf: string;

    @Column({nullable: false, length: 50})
    cidade: string;

    @Column({nullable: false, length: 50})
    pais: string;
}
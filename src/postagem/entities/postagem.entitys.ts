// modelar tabela do banco de dados //

import { Transform, TransformFnParams } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_postagem'}) // criando a  tb_postagens
export class Postagem {

    @PrimaryGeneratedColumn() //  Primary Key (id) auto increment
    id: number;

    @Transform(({ value }) => value?.trim()) // remover espaços em branco, inicio e fim//
    @IsNotEmpty() // força digitação//
    @Column({ length: 100, nullable: false }) // VARCHAR (100) NOT NULL,define o tipo do campo, tamanho e se é nulo ou não//
    titulo: string;

    @Transform(({ value }) => value?.trim()) // remover espaços em branco, inicio e fim//
    @IsNotEmpty() // força digitação//
    @Column({ length: 1000, nullable: false }) // VARCHAR (1000) NOT NULL,define o tipo do campo, tamanho e se é nulo ou não//
    texto: string;

    @UpdateDateColumn() // Atualiza a data automaticamente toda vez que o registro for atualizado//
    data: Date;
}
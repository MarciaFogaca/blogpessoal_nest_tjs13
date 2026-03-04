import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entitys";


@Injectable() // Classe responsável por criar as consultas no banco de dados
export class PostagemService {

   constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>
   ) {}

   async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }
} 
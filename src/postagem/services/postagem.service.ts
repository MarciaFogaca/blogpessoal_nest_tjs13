import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from '../../tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private readonly temaService: TemaService
    ) {}

  async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true
      }
    });
  }
   async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
        where: {
              id,
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findByAllTitulo(titulo: string): Promise<Postagem[]> {
    return  this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`) 
      },
      relations: {
        tema: true,
        usuario: true
      }
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
     await this.temaService.findById(postagem.tema.id); 

    return this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
       if (!postagem.id|| postagem.id <= 0)
          throw new HttpException('O Id da postagem é inválido!', HttpStatus.BAD_REQUEST);

       await this.findById(postagem.id);

       await this.temaService.findById(postagem.tema.id);
       //upadte tb_postagem SET titulo = ?, texto = ?, data = CURRENT_TIMESTAMP(), WHERE id = ?;
       return this.postagemRepository.save(postagem);

  }

  async delete(id: number): Promise<DeleteResult> {
     await this.findById(id);

    //delete from tb_postagem FROM id = ?;
    return await this.postagemRepository.delete(id);
  }
}
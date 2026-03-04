import { Controller, Get, HttpStatus, HttpCode } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entitys";

@Controller("/postagens") // Define o endereço da rota (ex: /postagens)
export class PostagemController {
    
    // Injetamos o Service para usar as funções que você criou lá
    constructor(private readonly postagemService: PostagemService) {}

    @Get() // Define que este método responde ao verbo GET
    @HttpCode(HttpStatus.OK) // Define que, se der certo, o status será 200 OK
    findAll(): Promise<Postagem[]> {
        // Chama a função do Service que vai buscar no banco
        return this.postagemService.findAll();
    }
}
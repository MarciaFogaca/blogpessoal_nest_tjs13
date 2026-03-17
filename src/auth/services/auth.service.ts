import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService, 
    private jwtService: JwtService          
  ) {}

  async validateUser(usuario: string, senha: string): Promise<any> {
    let buscaUsuario = await this.usuarioService.findByUsuario(usuario);

    if (buscaUsuario) {
        const senhaCorreta = await bcrypt.compare(senha, buscaUsuario.senha);
        if (senhaCorreta) {
            const { senha, ...result } = buscaUsuario; // Esconde a senha por segurança
            return result;
        }
    }
    return null;
  }
  
  async login(usuarioLogin: UsuarioLogin): Promise<any> {
    
    let buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

    if (buscaUsuario) {
        const senhaCorreta = await bcrypt.compare(usuarioLogin.senha, buscaUsuario.senha);

        if (senhaCorreta) {
            const payload = { username: buscaUsuario.usuario, sub: buscaUsuario.id };

            return {
                id: buscaUsuario.id,
                nome: buscaUsuario.nome,
                usuario: buscaUsuario.usuario,
                foto: buscaUsuario.foto,
                token: `Bearer ${this.jwtService.sign(payload)}`,
            };
        }
    }

    throw new HttpException('Usuário ou Senha inválidos!', HttpStatus.UNAUTHORIZED);
  }
}
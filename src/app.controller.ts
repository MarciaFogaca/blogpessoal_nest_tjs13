import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "🚀 Bem-vinda(o) ao Blog Pessoal de Márcia Telles Fogaça!!";
  }
}
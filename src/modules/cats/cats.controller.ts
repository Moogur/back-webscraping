import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';
import { ResponseCatDto } from './dto/responseCat.dto';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private srv: CatsService) {}

  @Get()
  @ApiOkResponse({ type: ResponseCatDto, isArray: true })
  getCats(): ResponseCatDto[] {
    return this.srv.getCats();
  }

  @Post()
  @HttpCode(200)
  @ApiCreatedResponse({ type: ResponseCatDto })
  createCat(@Body() createCatDto: CreateCatDto): ResponseCatDto {
    return this.srv.createCat(createCatDto);
  }
}

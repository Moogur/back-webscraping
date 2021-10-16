import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

import { ParserService } from './parser.service';
import { AllDataResponseDto, BaseScrabConfigDto, ScrabConfigDto } from './dto';
import { AllDataResponse, BaseScrabConfig, ScrabConfig } from './interfaces';

@Controller('parser')
@ApiTags('parser')
export class ParserController {
  constructor(private srv: ParserService) {}

  @Get('links')
  @ApiQuery({ type: BaseScrabConfigDto })
  @ApiOkResponse({ type: String, isArray: true })
  async getAllLinks(@Query() query: BaseScrabConfig): Promise<string[]> {
    try {
      const response = await this.srv.getLinks(query);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('titles')
  @ApiQuery({ type: BaseScrabConfigDto })
  @ApiOkResponse({ type: String, isArray: true })
  async getAllTitles(@Query() query: BaseScrabConfig): Promise<string[]> {
    try {
      const response = await this.srv.getTitles(query);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('data')
  @ApiQuery({ type: ScrabConfigDto })
  @ApiOkResponse({ type: AllDataResponseDto, isArray: true })
  async getAllData(@Query() query: ScrabConfig): Promise<AllDataResponse[]> {
    try {
      const response = await this.srv.getData(query);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

import { ParserService } from './parser.service';
import { AllDataResponseDto, BaseScrabConfigDto, ScrabConfigDto } from './dto';
import { AllDataResponse, BaseScrabConfig, ScrabConfig } from './interfaces';

@Controller('parser')
@ApiTags('parser')
export class ParserController {
  constructor(private srv: ParserService) {}

  @Get('allLinks')
  @ApiQuery({ type: BaseScrabConfigDto })
  @ApiOkResponse({ type: String, isArray: true })
  getAllLinks(@Query() query: BaseScrabConfig): Promise<string[]> {
    return this.srv.getLinks(query);
  }

  @Get('allTitles')
  @ApiQuery({ type: BaseScrabConfigDto })
  @ApiOkResponse({ type: String, isArray: true })
  getAllTitles(@Query() query: BaseScrabConfig): Promise<string[]> {
    return this.srv.getTitles(query);
  }

  @Get('allData')
  @ApiQuery({ type: ScrabConfigDto })
  @ApiOkResponse({ type: AllDataResponseDto, isArray: true })
  getAllData(@Query() query: ScrabConfig): Promise<AllDataResponse[]> {
    return this.srv.getData(query);
  }
}

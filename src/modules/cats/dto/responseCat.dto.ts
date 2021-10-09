import { PartialType } from '@nestjs/swagger';

import { CreateCatDto } from './createCat.dto';

export class ResponseCatDto extends PartialType(CreateCatDto) {}

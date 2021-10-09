import { Injectable } from '@nestjs/common';

import { Cat } from './interfaces/cats.interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [{ age: 1, name: 'Cat' }];

  getCats(): Cat[] {
    return this.cats;
  }

  createCat(cat: Cat): Cat {
    this.cats = [...this.cats, cat];
    return cat;
  }
}

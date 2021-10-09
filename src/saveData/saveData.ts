import fs from 'fs';

import { SaveDataType } from '../types';

export class SaveData {
  public toJSON(data: SaveDataType, fileName = 'result'): void {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(`${fileName}.json`, json, 'utf8');
  }
}

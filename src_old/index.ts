import { scrab } from './scrab';

scrab.saveAllDataToJSON('https://www.gamulator.com/roms/game-boy-advance', {
  baseSelector: '.card',
  titleSelector: '.card-title',
  urlSelector: 'a',
  countPage: 5,
  paginationSelector: '.pagination a',
  multiplePrefixUrl: 'https://www.gamulator.com/roms/',
});

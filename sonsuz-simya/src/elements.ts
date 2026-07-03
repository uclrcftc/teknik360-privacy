export type ElementId = string;

export interface ElementDef {
  id: ElementId;
  name: string;
  emoji: string;
}

export const BASE_ELEMENT_IDS: ElementId[] = ['water', 'fire', 'wind', 'earth'];

export const ELEMENTS: Record<ElementId, ElementDef> = {
  water: { id: 'water', name: 'Su', emoji: '💧' },
  fire: { id: 'fire', name: 'Ateş', emoji: '🔥' },
  wind: { id: 'wind', name: 'Rüzgar', emoji: '🌬️' },
  earth: { id: 'earth', name: 'Toprak', emoji: '🌍' },

  steam: { id: 'steam', name: 'Buhar', emoji: '💨' },
  mud: { id: 'mud', name: 'Çamur', emoji: '🟫' },
  wave: { id: 'wave', name: 'Dalga', emoji: '🌊' },
  lava: { id: 'lava', name: 'Lav', emoji: '🌋' },
  smoke: { id: 'smoke', name: 'Duman', emoji: '🌫️' },
  dust: { id: 'dust', name: 'Toz', emoji: '🏜️' },
  lake: { id: 'lake', name: 'Göl', emoji: '🏞️' },
  sun: { id: 'sun', name: 'Güneş', emoji: '☀️' },
  tornado: { id: 'tornado', name: 'Kasırga', emoji: '🌪️' },
  mountain: { id: 'mountain', name: 'Dağ', emoji: '⛰️' },

  cloud: { id: 'cloud', name: 'Bulut', emoji: '☁️' },
  rain: { id: 'rain', name: 'Yağmur', emoji: '🌧️' },
  brick: { id: 'brick', name: 'Tuğla', emoji: '🧱' },
  clay: { id: 'clay', name: 'Kil', emoji: '🏺' },
  stone: { id: 'stone', name: 'Taş', emoji: '🪨' },
  ash: { id: 'ash', name: 'Kül', emoji: '🩶' },
  glass: { id: 'glass', name: 'Cam', emoji: '🪟' },
  rainbow: { id: 'rainbow', name: 'Gökkuşağı', emoji: '🌈' },
  desert: { id: 'desert', name: 'Çöl', emoji: '🐫' },
  hurricane: { id: 'hurricane', name: 'Kasırga Fırtınası', emoji: '🌀' },
  island: { id: 'island', name: 'Ada', emoji: '🏝️' },
  mist: { id: 'mist', name: 'Sis', emoji: '🌁' },
  volcano: { id: 'volcano', name: 'Yanardağ', emoji: '🗻' },
  plant: { id: 'plant', name: 'Bitki', emoji: '🌱' },

  tree: { id: 'tree', name: 'Ağaç', emoji: '🌳' },
  flower: { id: 'flower', name: 'Çiçek', emoji: '🌸' },
  life: { id: 'life', name: 'Yaşam', emoji: '🧬' },
  fish: { id: 'fish', name: 'Balık', emoji: '🐟' },
  animal: { id: 'animal', name: 'Hayvan', emoji: '🐾' },
  metal: { id: 'metal', name: 'Metal', emoji: '⚙️' },
  dragon: { id: 'dragon', name: 'Ejderha', emoji: '🐉' },
  phoenix: { id: 'phoenix', name: 'Anka Kuşu', emoji: '🪶' },
  human: { id: 'human', name: 'İnsan', emoji: '🧍' },
  boat: { id: 'boat', name: 'Kayık', emoji: '⛵' },
  farmland: { id: 'farmland', name: 'Tarla', emoji: '🌾' },

  tool: { id: 'tool', name: 'Alet', emoji: '🔨' },
  sword: { id: 'sword', name: 'Kılıç', emoji: '⚔️' },
  house: { id: 'house', name: 'Ev', emoji: '🏠' },
  ship: { id: 'ship', name: 'Gemi', emoji: '🚢' },
  village: { id: 'village', name: 'Köy', emoji: '🏘️' },
  city: { id: 'city', name: 'Şehir', emoji: '🏙️' },
  machine: { id: 'machine', name: 'Makine', emoji: '🤖' },
  robot: { id: 'robot', name: 'Robot', emoji: '🦾' },
  farmer: { id: 'farmer', name: 'Çiftçi', emoji: '👨‍🌾' },
  sailor: { id: 'sailor', name: 'Denizci', emoji: '⛴️' },
};

function key(a: ElementId, b: ElementId): string {
  return [a, b].sort().join('+');
}

const RAW_RECIPES: [ElementId, ElementId, ElementId][] = [
  ['water', 'fire', 'steam'],
  ['water', 'earth', 'mud'],
  ['water', 'wind', 'wave'],
  ['fire', 'earth', 'lava'],
  ['fire', 'wind', 'smoke'],
  ['earth', 'wind', 'dust'],
  ['water', 'water', 'lake'],
  ['fire', 'fire', 'sun'],
  ['wind', 'wind', 'tornado'],
  ['earth', 'earth', 'mountain'],

  ['steam', 'wind', 'cloud'],
  ['cloud', 'water', 'rain'],
  ['mud', 'fire', 'brick'],
  ['mud', 'wind', 'clay'],
  ['lava', 'water', 'stone'],
  ['lava', 'wind', 'ash'],
  ['dust', 'fire', 'glass'],
  ['sun', 'rain', 'rainbow'],
  ['sun', 'earth', 'desert'],
  ['tornado', 'water', 'hurricane'],
  ['lake', 'earth', 'island'],
  ['lake', 'wind', 'mist'],
  ['mountain', 'fire', 'volcano'],
  ['rain', 'earth', 'plant'],

  ['plant', 'water', 'tree'],
  ['plant', 'sun', 'flower'],
  ['plant', 'earth', 'life'],
  ['life', 'water', 'fish'],
  ['life', 'earth', 'animal'],
  ['stone', 'fire', 'metal'],
  ['animal', 'fire', 'dragon'],
  ['life', 'fire', 'phoenix'],
  ['life', 'life', 'human'],
  ['human', 'water', 'boat'],
  ['plant', 'rain', 'farmland'],

  ['metal', 'human', 'tool'],
  ['tool', 'fire', 'sword'],
  ['human', 'tree', 'house'],
  ['boat', 'wind', 'ship'],
  ['house', 'house', 'village'],
  ['village', 'village', 'city'],
  ['city', 'metal', 'machine'],
  ['machine', 'city', 'robot'],
  ['human', 'farmland', 'farmer'],
  ['ship', 'human', 'sailor'],
];

export const RECIPES: Record<string, ElementId> = {};
for (const [a, b, result] of RAW_RECIPES) {
  RECIPES[key(a, b)] = result;
}

export function combine(a: ElementId, b: ElementId): ElementId | null {
  return RECIPES[key(a, b)] ?? null;
}

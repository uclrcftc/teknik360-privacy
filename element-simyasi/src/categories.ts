import type { ElementId } from './elements';

export type CategoryId =
  | 'base'
  | 'nature'
  | 'materials'
  | 'life'
  | 'civilization'
  | 'technology'
  | 'space'
  | 'mythology'
  | 'food'
  | 'abstract'
  | 'household'
  | 'fashion'
  | 'sports';

export interface CategoryDef {
  id: CategoryId;
  label: string;
  color: string;
}

export const CATEGORIES: Record<CategoryId, CategoryDef> = {
  base: { id: 'base', label: 'Temel', color: '#d4a765' },
  nature: { id: 'nature', label: 'Doğa', color: '#3fa8e0' },
  materials: { id: 'materials', label: 'Malzemeler', color: '#c9822e' },
  life: { id: 'life', label: 'Canlılar', color: '#4a9d5f' },
  civilization: { id: 'civilization', label: 'Uygarlık', color: '#b5533f' },
  technology: { id: 'technology', label: 'Teknoloji', color: '#4a7ba8' },
  space: { id: 'space', label: 'Uzay', color: '#6a5acd' },
  mythology: { id: 'mythology', label: 'Mitoloji', color: '#9c4fae' },
  food: { id: 'food', label: 'Yiyecek', color: '#d1636f' },
  abstract: { id: 'abstract', label: 'Soyut', color: '#a2799e' },
  household: { id: 'household', label: 'Ev Eşyaları', color: '#6b9080' },
  fashion: { id: 'fashion', label: 'Moda', color: '#c9668f' },
  sports: { id: 'sports', label: 'Spor', color: '#3f9b6e' },
};

export const CATEGORY_ORDER: CategoryId[] = [
  'base',
  'nature',
  'materials',
  'life',
  'civilization',
  'technology',
  'space',
  'mythology',
  'food',
  'abstract',
  'household',
  'fashion',
  'sports',
];

const GROUPS: Record<CategoryId, ElementId[]> = {
  base: ['water', 'fire', 'wind', 'earth'],
  nature: [
    'steam', 'mud', 'wave', 'lava', 'smoke', 'dust', 'lake', 'sun', 'tornado', 'mountain',
    'cloud', 'rain', 'ash', 'rainbow', 'desert', 'hurricane', 'island', 'mist', 'volcano',
    'storm', 'lightning', 'thunder', 'snow', 'ice', 'blizzard', 'glacier', 'sand', 'beach',
    'swamp', 'oasis', 'river',
    'earthquake', 'tsunami', 'avalanche', 'geyser', 'quicksand', 'aurora', 'fog', 'puddle',
    'waterfall', 'canyon', 'meadow', 'jungle', 'iceberg', 'lagoon', 'cave', 'crystal',
    'hotspring', 'permafrost', 'savanna',
  ],
  materials: [
    'brick', 'clay', 'stone', 'glass', 'metal', 'coal', 'gem', 'diamond', 'gold', 'jewelry',
    'rust', 'electricity', 'oil', 'plastic', 'concrete', 'wire', 'magnet', 'steel', 'bronze',
  ],
  life: [
    'plant', 'tree', 'flower', 'life', 'fish', 'animal', 'dragon', 'phoenix', 'bird', 'egg',
    'insect', 'bee', 'honey', 'spider', 'ocean', 'whale', 'shark', 'coral', 'snake', 'forest',
    'wolf', 'bear', 'monkey', 'cow', 'milk', 'cheese', 'sheep', 'wool', 'chicken', 'pig',
    'dinosaur', 'bacteria', 'virus',
    'lion', 'tiger', 'elephant', 'giraffe', 'panda', 'rabbit', 'fox', 'owl', 'eagle', 'parrot',
    'penguin', 'turtle', 'crab', 'octopus', 'jellyfish', 'dolphin', 'cat', 'dog',
  ],
  civilization: [
    'human', 'boat', 'farmland', 'tool', 'sword', 'house', 'ship', 'village', 'city', 'machine',
    'robot', 'farmer', 'sailor', 'king', 'queen', 'knight', 'castle', 'kingdom', 'army', 'war',
    'peace', 'gun', 'bomb', 'nuclear', 'money', 'market', 'bank', 'factory', 'tower', 'bridge',
    'temple', 'church',
    'doctor', 'teacher', 'police', 'lawyer', 'judge', 'president', 'senator', 'soldier', 'pirate',
    'astronomer', 'scientist', 'painter', 'school', 'university', 'exam', 'diploma', 'backpack',
    'globe',
  ],
  technology: [
    'computer', 'internet', 'phone', 'television', 'camera', 'rocket', 'satellite', 'astronaut',
    'alien', 'ufo', 'airplane', 'wheel', 'car', 'train', 'ai',
    'keyboard', 'computermouse', 'headphones', 'speaker', 'battery', 'lightbulb', 'fridge',
    'watch', 'atm', 'creditcard',
    'motorcycle', 'bicycle', 'truck', 'bus', 'helicopter', 'tractor',
  ],
  space: [
    'star', 'moon', 'comet', 'meteor', 'planet', 'galaxy', 'universe', 'blackhole',
    'spaceship', 'supernova', 'neutronstar', 'wormhole', 'asteroid', 'nebula', 'mars',
    'spacestation', 'laser', 'android',
  ],
  mythology: [
    'ghost', 'god', 'angel', 'devil', 'demon', 'zombie', 'night', 'bat', 'vampire', 'werewolf',
    'magic', 'witch', 'wizard', 'horse', 'unicorn', 'mermaid', 'monster', 'kraken',
    'fairy', 'elf', 'dwarf', 'troll', 'giant', 'centaur', 'griffin', 'pegasus', 'banshee',
    'genie', 'oracle', 'titan',
  ],
  food: [
    'wheat', 'flour', 'bread', 'rice', 'sugar', 'cake', 'wine', 'beer', 'coffee', 'leaf', 'tea',
    'chocolate', 'icecream', 'pizza', 'salt',
    'apple', 'banana', 'orangefruit', 'grape', 'lemon', 'juice', 'soda', 'noodles', 'soup',
    'sandwich', 'burger', 'fries', 'donut', 'cookie',
  ],
  abstract: [
    'time', 'love', 'music', 'art', 'dance', 'dream', 'nightmare', 'soul',
    'violin', 'drum', 'opera', 'sculpture', 'painting',
    'happiness', 'sadness', 'anger', 'fear', 'courage', 'wisdom', 'hope',
  ],
  household: [
    'jar', 'wallet', 'glasses', 'mirror', 'umbrella', 'doorkey', 'lock', 'soap', 'candle',
    'perfume', 'guitar', 'piano', 'paper', 'book', 'pen', 'pencil', 'newspaper', 'map', 'kite',
    'balloon', 'pool', 'pot', 'pan', 'knife', 'spoon', 'chair', 'door', 'garden', 'window',
    'toilet', 'shower', 'bed', 'pillow', 'blanket',
  ],
  fashion: ['shirt', 'pants', 'shoes', 'hat', 'scarf', 'crown', 'ring', 'necklace'],
  sports: ['football', 'basketball', 'tennis', 'swimming', 'chess', 'cards'],
};

const LOOKUP: Partial<Record<ElementId, CategoryId>> = {};
for (const category of CATEGORY_ORDER) {
  for (const id of GROUPS[category]) {
    LOOKUP[id] = category;
  }
}

export function categoryOf(elementId: ElementId): CategoryId {
  return LOOKUP[elementId] ?? 'nature';
}

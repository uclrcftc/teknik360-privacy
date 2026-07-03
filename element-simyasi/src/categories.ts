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
  | 'abstract';

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
];

const GROUPS: Record<CategoryId, ElementId[]> = {
  base: ['water', 'fire', 'wind', 'earth'],
  nature: [
    'steam', 'mud', 'wave', 'lava', 'smoke', 'dust', 'lake', 'sun', 'tornado', 'mountain',
    'cloud', 'rain', 'ash', 'rainbow', 'desert', 'hurricane', 'island', 'mist', 'volcano',
    'storm', 'lightning', 'thunder', 'snow', 'ice', 'blizzard', 'glacier', 'sand', 'beach',
    'swamp', 'oasis', 'river',
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
  ],
  civilization: [
    'human', 'boat', 'farmland', 'tool', 'sword', 'house', 'ship', 'village', 'city', 'machine',
    'robot', 'farmer', 'sailor', 'king', 'queen', 'knight', 'castle', 'kingdom', 'army', 'war',
    'peace', 'gun', 'bomb', 'nuclear', 'money', 'market', 'bank', 'factory', 'tower', 'bridge',
    'temple', 'church',
  ],
  technology: [
    'computer', 'internet', 'phone', 'television', 'camera', 'rocket', 'satellite', 'astronaut',
    'alien', 'ufo', 'airplane', 'wheel', 'car', 'train', 'ai',
  ],
  space: ['star', 'moon', 'comet', 'meteor', 'planet', 'galaxy', 'universe', 'blackhole'],
  mythology: [
    'ghost', 'god', 'angel', 'devil', 'demon', 'zombie', 'night', 'bat', 'vampire', 'werewolf',
    'magic', 'witch', 'wizard', 'horse', 'unicorn', 'mermaid', 'monster', 'kraken',
  ],
  food: [
    'wheat', 'flour', 'bread', 'rice', 'sugar', 'cake', 'wine', 'beer', 'coffee', 'leaf', 'tea',
    'chocolate', 'icecream', 'pizza', 'salt',
  ],
  abstract: ['time', 'love', 'music', 'art', 'dance', 'dream', 'nightmare', 'soul'],
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

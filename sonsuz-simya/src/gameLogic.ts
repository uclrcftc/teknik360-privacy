import { BASE_ELEMENT_IDS, ElementId } from './elements';

export interface WorkspaceItem {
  uid: string;
  elementId: ElementId;
  x: number;
  y: number;
}

let uidCounter = 0;
export function nextUid(): string {
  uidCounter += 1;
  return `item-${uidCounter}-${Date.now()}`;
}

export function initialDiscovered(): Set<ElementId> {
  return new Set(BASE_ELEMENT_IDS);
}

export const ITEM_SIZE = 96;

export function overlaps(a: WorkspaceItem, b: WorkspaceItem): boolean {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx < ITEM_SIZE * 0.7 && dy < ITEM_SIZE * 0.7;
}

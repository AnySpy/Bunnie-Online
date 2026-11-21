import type { Plant } from "./plant";

export interface Inventory {
    id: number,
    stored_item: Plant | null,
    stored_item_image: string | null,
}
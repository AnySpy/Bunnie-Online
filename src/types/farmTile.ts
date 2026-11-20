import type { Plant } from "./plant";

export interface FarmTile {
    id: number;
    stored_item: Plant | null;
    completion_timestamp_ms: number | null;
    growth_stage_img: string
}
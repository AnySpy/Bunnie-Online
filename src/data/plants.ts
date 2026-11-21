import type { Plant } from "../types/plant";

import carrot from "../assets/Carrot.png";
import hay from "../assets/Hay.png";

export const plants: Plant[] = [
    {
        id: 0,
        name: "Carrot",
        growth_duration_ms: 2500,
        grown_image: carrot,
    },
    {
        id: 1,
        name: "Hay",
        growth_duration_ms: 3500,
        grown_image: hay,
    },
]
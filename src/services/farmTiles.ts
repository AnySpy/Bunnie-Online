import type { FarmTile } from "../types/farmTile";
import emptyFarmImage from '../assets/Farmland_Empty.png';

export function generateFarmTiles(count: number): FarmTile[] {
    let newArr: FarmTile[] = [];
    
    for(let i = 0; i < count; i++) {
      const newTile: FarmTile = {
        id: i, 
        stored_item: null, 
        completion_timestamp_ms: null,
        growth_stage_img: emptyFarmImage,
      }
      
      newArr.push(newTile);
    }

    return newArr;
  }
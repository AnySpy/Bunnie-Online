import type { FarmTile } from "../types/farmTile";

export function generateFarmTiles(count: number): FarmTile[] {
    let newArr: FarmTile[] = [];
    
    for(let i = 0; i < count; i++) {
      const newTile: FarmTile = {
        id: i, 
        stored_item: null, 
        completion_timestamp_ms: null
      }
      
      newArr.push(newTile);
    }

    return newArr;
  }
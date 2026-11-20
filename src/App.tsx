import { useState } from 'react'
import type { FarmTile } from './types/farmTile'
import type { Plant } from './types/plant'
import { plants } from './data/plants'
import { generateFarmTiles } from './services/farmTiles'

import emptyFarmImage from './assets/Farmland_Empty.png';
import growingFarmImage from './assets/Farmland_Growing.png';

import './App.css'

function App() {
  let plotSize: number = 9;

  const [farmTilesArray, setFarmTilesArray] = useState<FarmTile[]>(generateFarmTiles(plotSize));
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleButtonClick = (selectedTile: FarmTile) => {
    setSelectedTileId(selectedTile.id);

    if (selectedTile.stored_item != null) {
      let newTilesArr: FarmTile[] = []

      farmTilesArray.map((tile) => {
        if(tile.id === selectedTile.id && tile.completion_timestamp_ms !== null && tile.completion_timestamp_ms <= Date.now()) {
          const newTile: FarmTile = {
            id: selectedTile.id,
            stored_item: null,
            completion_timestamp_ms: null,
            growth_stage_img: emptyFarmImage,
          }
          
          newTilesArr.push(newTile);
        } else {
          newTilesArr.push(tile);
        }
      });

      setFarmTilesArray(newTilesArr);
      setSelectedTileId(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePlantSelected = (plant: Plant) => {
    let newTilesArr: FarmTile[] = [];
    
    if (selectedTileId != null) {
      farmTilesArray.map((tile) => {
        if (tile.id === selectedTileId) {
          const newTile: FarmTile = {
            id: tile.id,
            stored_item: plant,
            completion_timestamp_ms: Date.now() + plant.growth_duration_ms,
            growth_stage_img: growingFarmImage
          };

          newTilesArr.push(newTile);
        } else {
          newTilesArr.push(tile);
        }
      });
    }

    setFarmTilesArray(newTilesArr);
    setIsModalOpen(false);
    setSelectedTileId(null);
  }

  return (
    <div className='farm-container'>
      <div className='plot-container'>
        {farmTilesArray.map((tile =>
          <button onClick={() => handleButtonClick(tile)} key={tile.id}>
            <img src={tile.growth_stage_img} />
            {(tile.stored_item != null) ? `${tile.stored_item.name}` : "Pick Plant"}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className='modal-backdrop'>
          <div className='modal-content'>
            {plants.map((plant) => (
              <div className='plant-container' key={plant.id}>
                <button onClick={() => handlePlantSelected(plant)}>{plant.name}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

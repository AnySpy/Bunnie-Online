// ? React imports
import { useState } from 'react'

// ? Type imports
import type { Inventory } from './types/inventory'
import type { FarmTile } from './types/farmTile'
import type { Plant } from './types/plant'

// ? Data imports
import { plants } from './data/plants'

// ? Service imports
import { generateFarmTiles } from './services/farmTiles'
import { generateInventory } from './services/inventories'

// ? Image imports
import emptyFarmImage from './assets/Farmland_Empty.png';
import growingFarmImage from './assets/Farmland_Growing.png';

// ? CSS imports
import './App.css'

function App() {
  const plotSize: number = 9;
  const inventorySize: number = 9;
  
  const [farmTilesArray, setFarmTilesArray] = useState<FarmTile[]>(generateFarmTiles(plotSize));
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);
  const [itemInventory, setItemInventory] = useState<Inventory[]>(generateInventory(inventorySize));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleButtonClick = (selectedTile: FarmTile) => {
    setSelectedTileId(selectedTile.id);

    if (selectedTile.stored_item != null) {
      let newTilesArr: FarmTile[] = []

      farmTilesArray.map((tile) => {
        if(tile.id === selectedTile.id && tile.completion_timestamp_ms !== null && tile.completion_timestamp_ms <= Date.now()) {
          if (tile.stored_item !== null) {
            const clearedPlant: Plant = tile.stored_item;
            let assignedPlant: boolean = false;

            let newInventoryArr: Inventory[] = []
            itemInventory.map((slot) => {
              if (!assignedPlant && slot.stored_item === null) {
                const newInventorySlot: Inventory = {
                  id: slot.id,
                  stored_item: clearedPlant,
                  stored_item_image: clearedPlant.grown_image,
                };

                assignedPlant = true;
                newInventoryArr.push(newInventorySlot);
              } else {
                newInventoryArr.push(slot);
              }
            });

            setItemInventory(newInventoryArr);
          }

          const newTile: FarmTile = {
            id: selectedTile.id,
            stored_item: null,
            completion_timestamp_ms: null,
            growth_stage_img: emptyFarmImage,
          };
          
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
      <div className='inventory-container'>
        {itemInventory.map((slot) =>
          <button>
            <img src={(slot.stored_item_image !== null) ? slot.stored_item_image : undefined} />
          </button>
        )}
      </div>

      <div className='plot-container'>
        {farmTilesArray.map((tile =>
          <button onClick={() => handleButtonClick(tile)} key={tile.id}>
            <img src={tile.growth_stage_img} />
            <span>{(tile.stored_item != null) ? `${tile.stored_item.name}` : "Pick Plant"}</span>
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

      <div className='dog-online-banner'>
        <a href='https://dogonline.net/'>
          <img src='https://dogonline.net/img/letters/goodies/button_dol.gif' />
        </a>
      </div>
    </div>
  )
}

export default App

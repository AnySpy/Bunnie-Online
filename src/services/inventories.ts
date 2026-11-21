import type { Inventory } from "../types/inventory";

export function generateInventory(count: number) {
    let newArr: Inventory[] = []
    
    for (let i = 0; i < count; i++) {
        const newSlot: Inventory = {
            id: i,
            stored_item: null,
            stored_item_image: null,
        };

        newArr.push(newSlot);
    }

    return newArr;
}
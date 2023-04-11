import { Inventory } from './entities/inventory.entity';

const inventoryResponseSerializer = (inventory: Inventory) => {
  delete inventory.deletedAt;
};

export default inventoryResponseSerializer;

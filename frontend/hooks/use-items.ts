import { IBeetItem } from "@/interfaces/beet-item.interface";
import { useEffect, useState } from "react";

const GET_ITEMS_URL = "http://localhost:3001/item/list";

const useItems = () => {
  const [items, setItems] = useState<IBeetItem[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(GET_ITEMS_URL);
      const data: IBeetItem[] = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return {
    items,
  };
};

export default useItems;
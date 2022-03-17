import axios from "axios";
import type { ItemApi, ListApi, ListDetailApi } from "@/types";

axios.defaults.baseURL = "https://622f930e3ff58f023c246ac1.mockapi.io/";

export default {
  async getLists(): Promise<ListApi[]> {
    // Remove items property
    return (await axios.get<ListDetailApi[]>("lists")).data.map(
      ({ items, ...other }) => other
    );
  },

  async getListDetail(id: string) {
    return (await axios.get<ListDetailApi>(`lists/${id}`)).data;
  },

  async addList(list: ListDetailApi) {
    return (await axios.post<ListDetailApi>("lists/", list)).data;
  },

  async addListItem(item: ItemApi) {
    return (await axios.put<ItemApi>(`/lists/${item.listId}/items/`, item))
      .data;
  },

  async editListItem(item: ItemApi) {
    return (
      await axios.put<ItemApi>(`/lists/${item.listId}/items/${item.id}`, item)
    ).data;
  },
};

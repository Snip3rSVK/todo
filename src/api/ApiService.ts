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

  async editList(list: ListApi) {
    return (await axios.put<ListApi>(`lists/${list.id}`, list)).data;
  },

  async removeList(list: ListDetailApi) {
    list.items.forEach((item) => this.removeListItem(item));
    return (await axios.delete<ListApi>(`lists/${list.id}`)).data;
  },

  async addListItem(item: ItemApi) {
    return (await axios.post<ItemApi>(`/lists/${item.listId}/items/`, item))
      .data;
  },

  async editListItem(item: ItemApi) {
    return (
      await axios.put<ItemApi>(`/lists/${item.listId}/items/${item.id}`, item)
    ).data;
  },

  async removeListItem({ listId, id }: ItemApi) {
    return (await axios.delete(`lists/${listId}/items/${id}`)).data;
  },
};

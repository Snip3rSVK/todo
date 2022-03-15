import axios from "axios";
import type { ListApi, ListDetailApi } from "@/types";

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
};

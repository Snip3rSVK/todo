import ApiService from "@/api/ApiService";
import type { RootState, ListDetailApi, ItemApi } from "@/types";
import type { Module } from "vuex";

interface ItemActive {
  item: ItemApi;
  active: ItemApi["active"];
}

const listModule: Module<ListDetailApi, RootState> = {
  namespaced: true,
  state: () => ({
    id: "",
    title: "",
    items: [],
  }),
  getters: {},
  mutations: {
    SET_ALL(state: ListDetailApi, payload: ListDetailApi) {
      state.id = payload.id;
      state.title = payload.title;
      state.items = payload.items;
    },
    ADD_ITEM(state: ListDetailApi, item: ItemApi) {
      state.items.push(item);
    },
    SET_ITEM_STATUS(state: ListDetailApi, payload: ItemActive) {
      payload.item.active = payload.active;
    },
    SET_ITEM(state: ListDetailApi, item: ItemApi) {
      state.items.forEach((elem, i) =>
        elem.id === item.id ? (state.items[i] = item) : null
      );
    },
  },
  actions: {
    async getListDetail({ commit }, id: string) {
      const response = await ApiService.getListDetail(id);

      commit("SET_ALL", response);
    },

    async updateItemStatus({ commit, dispatch }, payload: ItemActive) {
      commit("SET_ITEM_STATUS", payload);

      dispatch("updateItem", payload.item);
    },

    async updateItem({ commit }, item: ItemApi) {
      const response = await ApiService.editListItem(item);

      commit("SET_ITEM", response);
    },

    async addItem({ commit }, item: ItemApi) {
      // All properties must have values so that api doesn't generate random data on them
      const response = await ApiService.addListItem({
        id: item.id || "",
        listId: item.listId || "",
        active: item.active || false,
        title: item.title || "",
        description: item.description || "",
        date: item.date || null,
      });

      commit("ADD_ITEM", response);
    },
  },
};

export default listModule;

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
    SET_ITEM_STATUS(state: ListDetailApi, payload: ItemActive) {
      payload.item.active = payload.active;
    },
    SET_ITEM(state: ListDetailApi, payload: ItemApi) {
      state.items.forEach((item, i) =>
        item.id === payload.id ? (state.items[i] = payload) : null
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

    async updateItem({ commit }, payload: ItemApi) {
      const response = await ApiService.editListItem(payload);

      commit("SET_ITEM", response);
    },
  },
};

export default listModule;

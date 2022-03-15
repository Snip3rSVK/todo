import ApiService from "@/api/ApiService";
import type { RootState, ListDetailApi } from "@/types";
import type { Module } from "vuex";

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
      console.log(state.items);
    },
  },
  actions: {
    async getListDetail({ commit }, id: string) {
      const response = await ApiService.getListDetail(id);

      commit("SET_ALL", response);
    },
  },
};

export default listModule;

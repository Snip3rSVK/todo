import ApiService from "@/api/ApiService";
import type { RootState, ListApi } from "@/types";
import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import listModule from "./modules/list";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state: {
    lists: [],
    navOpened: true,
  },
  mutations: {
    // TODO constants
    SET_LISTS(state: RootState, lists: ListApi[]) {
      // TODO is this reactive?
      state.lists = lists;
    },

    TOGGLE_NAV(state: RootState) {
      state.navOpened = !state.navOpened;
      console.log("STATE TOGGLE", state.navOpened);
    },

    SET_NAV(state: RootState, opened: boolean) {
      state.navOpened = opened;
      console.log("STATE SET", state.navOpened);
    },
  },
  actions: {
    // TODO constants
    async getLists({ commit }) {
      const response = await ApiService.getLists();

      commit("SET_LISTS", response);
    },
  },
  modules: {
    list: listModule,
  },
  // TODO remove in production
  strict: true,
});

export function useStore() {
  return baseUseStore(key);
}

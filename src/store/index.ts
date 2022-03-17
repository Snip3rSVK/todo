import ApiService from "@/api/ApiService";
import type { RootState, ListApi, ModalSetup, ListDetailApi } from "@/types";
import { shallowRef, type InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import listModule from "./modules/list";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state: {
    lists: [],
    navOpened: true,
    modal: {
      opened: false,
      component: null,
      componentProps: null,
    },
  },
  mutations: {
    // TODO constants
    SET_LISTS(state: RootState, lists: ListApi[]) {
      state.lists = lists;
    },

    ADD_LIST(state: RootState, list: ListDetailApi) {
      state.lists.push(list);
    },

    TOGGLE_NAV(state: RootState) {
      state.navOpened = !state.navOpened;
    },

    SET_NAV(state: RootState, opened: boolean) {
      state.navOpened = opened;
    },

    OPEN_MODAL(state: RootState, setup: ModalSetup) {
      state.modal.component = shallowRef(setup.component);
      state.modal.componentProps = setup.componentProps;
      state.modal.opened = true;
    },

    CLOSE_MODAL(state: RootState) {
      state.modal.opened = false;
    },

    SET_MODAL(state: RootState, value: boolean) {
      state.modal.opened = value;
    },
  },
  actions: {
    // TODO constants
    async getLists({ commit }) {
      const response = await ApiService.getLists();

      commit("SET_LISTS", response);
    },

    async addList({ commit }, name: string) {
      const response = await ApiService.addList({
        id: "",
        title: name,
        items: [],
      });

      commit("ADD_LIST", response);
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

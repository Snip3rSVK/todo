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
  getters: {
    getNextListId: (state: RootState) => (currId: string) => {
      let nextId = "";

      state.lists.forEach((list, i) => {
        if (list.id === currId) {
          nextId = state.lists[(i + 1) % state.lists.length].id;
        }
      });

      if (!nextId || currId === nextId) {
        return null;
      } else {
        return nextId;
      }
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

    SET_LIST(state: RootState, list: ListApi) {
      state.lists.forEach((elem, i) =>
        elem.id === list.id ? (state.lists[i] = list) : null
      );
    },

    REMOVE_LIST(state: RootState, id: string) {
      state.lists = state.lists.filter((list) => list.id !== id);
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

    async editList({ commit }, payload: ListApi) {
      const response = await ApiService.editList(payload);

      commit("SET_LIST", response);
      commit("list/SET_TITLE", response.title);
    },

    async removeList({ commit }, list: ListDetailApi) {
      await ApiService.removeList(list);

      commit("REMOVE_LIST", list.id);
      commit("list/CLEAR_ALL");
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

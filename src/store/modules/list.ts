import ApiService from "@/api/ApiService";
import type { RootState, ListDetailApi, ItemApi } from "@/types";
import type { Module } from "vuex";

interface ItemCompleted {
  item: ItemApi;
  completed: ItemApi["completed"];
}

interface ListStore extends ListDetailApi {
  filter: {
    completed: boolean | null;
    searchText: string;
  };
}

const getDefaultState = () => {
  return {
    id: "",
    title: "",
    items: [],
    filter: {
      completed: null,
      searchText: "",
    },
  };
};

const listModule: Module<ListStore, RootState> = {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getFilteredItems(state: ListStore) {
      let result = state.items;

      if (state.filter.completed !== null) {
        result = result.filter(
          (item) => item.completed === state.filter.completed
        );
      }

      if (state.filter.searchText) {
        result = result.filter((item) =>
          item.title
            .toLowerCase()
            .includes(state.filter.searchText.toLowerCase())
        );
      }

      return result;
    },
  },
  mutations: {
    SET_ALL(state: ListStore, payload: ListDetailApi) {
      state.id = payload.id;
      state.title = payload.title;
      state.items = payload.items;
    },
    CLEAR_ALL(state: ListStore) {
      Object.assign(state, getDefaultState());
    },
    SET_TITLE(state: ListStore, title: string) {
      state.title = title;
    },
    FILTER_SEARCH_TEXT(state: ListStore, text: string) {
      state.filter.searchText = text;
    },
    FILTER_COMPLETED(state: ListStore) {
      state.filter.completed = true;
    },
    FILTER_ACTIVE(state: ListStore) {
      state.filter.completed = false;
    },
    FILTER_ALL(state: ListStore) {
      state.filter.completed = null;
    },
    ADD_ITEM(state: ListStore, item: ItemApi) {
      state.items.push(item);
    },
    SET_ITEM_STATUS(state: ListStore, payload: ItemCompleted) {
      payload.item.completed = payload.completed;
    },
    SET_ITEM(state: ListStore, item: ItemApi) {
      state.items.forEach((elem, i) =>
        elem.id === item.id ? (state.items[i] = item) : null
      );
    },
    REMOVE_ITEM(state: ListStore, id: string) {
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
  actions: {
    async getListDetail({ commit }, id: string) {
      const response = await ApiService.getListDetail(id);

      commit("SET_ALL", response);
    },

    async updateItemStatus({ commit, dispatch }, payload: ItemCompleted) {
      commit("SET_ITEM_STATUS", payload);

      dispatch("editItem", payload.item);
    },

    async addItem({ commit }, item: ItemApi) {
      // All properties must have values so that api doesn't generate random data on them
      const response = await ApiService.addListItem({
        id: item.id || "",
        listId: item.listId || "",
        completed: item.completed || false,
        title: item.title || "",
        description: item.description || "",
        date: item.date || null,
      });

      commit("ADD_ITEM", response);
    },

    async editItem({ commit }, item: ItemApi) {
      const response = await ApiService.editListItem(item);

      commit("SET_ITEM", response);
    },

    async removeItem({ commit }, item: ItemApi) {
      await ApiService.removeListItem(item);

      commit("REMOVE_ITEM", item.id);
    },
  },
};

export default listModule;

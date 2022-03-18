import type { DefineComponent, ShallowRef } from "vue";

interface Modal {
  component: ShallowRef<ModalSetup["component"]> | null;
  componentProps: ModalSetup["componentProps"];
  opened: boolean;
}

export interface ModalSetup {
  component: DefineComponent | null;
  componentProps?: object | null;
}

export interface RootState {
  lists: ListApi[];
  navOpened: boolean;
  modal: Modal;
}

export interface ListApi {
  id: string;
  title: string;
}

export interface ItemApi {
  id: string;
  listId: string;
  active: boolean;
  title: string;
  description?: string;
  date?: string | null;
}

export interface ListDetailApi extends ListApi {
  items: ItemApi[];
}

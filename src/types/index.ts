export interface RootState {
  lists: ListApi[];
  navOpened: boolean;
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
  date?: Date;
}

export interface ListDetailApi extends ListApi {
  items: ItemApi[];
}

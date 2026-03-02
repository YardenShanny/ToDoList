import { atom, AtomEffect } from 'recoil';
import { Todo, Group } from '../types';

// Generic localStorage effect
const localStorageEffect = <T>(key: string): AtomEffect<T> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
  effects: [localStorageEffect<Todo[]>('todo_list')],
});

export const groupListState = atom<Group[]>({
  key: 'groupListState',
  default: [],
  effects: [localStorageEffect<Group[]>('group_list')],
});

export const selectedTodoIdsState = atom<string[]>({
  key: 'selectedTodoIdsState',
  default: [],
});

export const activeGroupFilterState = atom<string | null>({
  key: 'activeGroupFilterState',
  default: null, // null means "All"
});
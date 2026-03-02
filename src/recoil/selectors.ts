import { selector } from 'recoil';
import { Todo } from '../types';
import { activeGroupFilterState, todoListState, groupListState } from './atoms';

export const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const filter = get(activeGroupFilterState);
    const todos = get(todoListState);

    if (filter === null) {
      return todos;
    }
    return todos.filter((todo: Todo) => todo.groupId === filter);
  },
});

export const completionStatsState = selector({
  key: 'completionStatsState',
  get: ({ get }) => {
    const todos = get(todoListState);
    const completed = todos.filter((todo) => todo.completed).length;
    const total = todos.length;

    return {
      completed,
      total,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  },
});

export const activeGroupNameState = selector({
  key: 'activeGroupNameState',
  get: ({ get }) => {
    const activeGroupId = get(activeGroupFilterState);
    if (activeGroupId === null) return 'All Todos';

    const groups = get(groupListState);
    const group = groups.find((g) => g.id === activeGroupId);
    return group ? group.name : 'Unknown Group';
  },
});

export const hasSelectedItemsState = selector({
  key: 'hasSelectedItemsState',
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.some((todo) => todo.completed);
  },
});
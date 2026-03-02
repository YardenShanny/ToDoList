import { create } from 'zustand';
import { Todo, Group } from './types';

// We'll manually sync the two lists (todos and groups) to localStorage under
// the same keys that Recoil previously used.  This keeps existing user data
// intact when migrating.
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export interface TodoStore {
  todos: Todo[];
  groups: Group[];
  selectedTodoIds: string[];
  activeGroup: string | null;

  // setters
  setTodos: (todos: Todo[] | ((prev: Todo[]) => Todo[])) => void;
  setGroups: (groups: Group[] | ((prev: Group[]) => Group[])) => void;
  setSelectedTodoIds: (ids: string[]) => void;
  setActiveGroup: (id: string | null) => void;
}

export const useStore = create<TodoStore>((set) => {
  const initialTodos = loadFromStorage<Todo[]>('todo_list', []);
  const initialGroups = loadFromStorage<Group[]>('group_list', []);

  return {
    todos: initialTodos,
    groups: initialGroups,
    selectedTodoIds: [],
    activeGroup: null,

    setTodos: (todos) => {
      set((state) => {
        const newTodos = typeof todos === 'function' ? (todos as (p: Todo[]) => Todo[])(state.todos) : todos;
        localStorage.setItem('todo_list', JSON.stringify(newTodos));
        return { todos: newTodos };
      });
    },
    setGroups: (groups) => {
      set((state) => {
        const newGroups = typeof groups === 'function' ? (groups as (p: Group[]) => Group[])(state.groups) : groups;
        localStorage.setItem('group_list', JSON.stringify(newGroups));
        return { groups: newGroups };
      });
    },

    setSelectedTodoIds: (ids: string[]) => set({ selectedTodoIds: ids }),
    setActiveGroup: (id: string | null) => set({ activeGroup: id }),
  };
});

// derived selectors (convenience hooks)
export const useFilteredTodos = (): Todo[] =>
  useStore((s) => {
    if (s.activeGroup === null) return s.todos;
    return s.todos.filter((t: Todo) => t.groupId === s.activeGroup);
  });

export const useActiveGroupName = (): string =>
  useStore((s) => {
    if (s.activeGroup === null) return 'All Todos';
    const group = s.groups.find((g: Group) => g.id === s.activeGroup);
    return group ? group.name : 'Unknown Group';
  });

export const useCompletionStats = (): { completed: number; total: number; percentage: number } =>
  useStore((s) => {
    const completed = s.todos.filter((t: Todo) => t.completed).length;
    const total = s.todos.length;
    return {
      completed,
      total,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  });

export const useHasSelectedItems = (): boolean =>
  useStore((s) => s.selectedTodoIds.length > 0);

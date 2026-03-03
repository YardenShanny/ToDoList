import { TodoStore, useStore } from '../store';
import { Todo } from '../types';

export const BulkActionBar = () => {
  const selectedIds = useStore((s: TodoStore) => s.selectedTodoIds);
  const setSelectedIds = useStore((s: TodoStore) => s.setSelectedTodoIds);
  const setTodos = useStore((s: TodoStore) => s.setTodos);

  if (selectedIds.length === 0) return null;

  const handleBulkComplete = () => {
    setTodos((oldTodos: Todo[]) =>
      oldTodos.map((todo) =>
        selectedIds.includes(todo.id) ? { ...todo, completed: true } : todo
      )
    );
    setSelectedIds([]); // Clear selection after action
  };

  const handleBulkDelete = () => {
    setTodos((oldTodos: Todo[]) => oldTodos.filter((todo) => !selectedIds.includes(todo.id)));
    setSelectedIds([]);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex gap-4 items-center">
      <span>{selectedIds.length} selected</span>
      <button onClick={handleBulkComplete} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">Mark Done</button>
      <button onClick={handleBulkDelete} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">Delete</button>
    </div>
  );
};
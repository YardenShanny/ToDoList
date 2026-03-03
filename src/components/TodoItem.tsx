import { useState } from 'react';
import { TodoStore, useStore } from '../store';
import { Todo } from '../types';
import { Trash2, CheckCircle, Circle, Edit2 } from 'lucide-react';
import { EditTodoModal } from './EditTodoModal';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const selectedIds = useStore((s: TodoStore) => s.selectedTodoIds);
  const setSelectedIds = useStore((s: TodoStore) => s.setSelectedTodoIds);
  const setTodos = useStore((s: TodoStore) => s.setTodos);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isSelected = selectedIds.includes(todo.id);

  const handleToggleSelect = () => {
    const newSelectedIds: string[] = isSelected ? selectedIds.filter((id) => id !== todo.id) : [...selectedIds, todo.id];
    setSelectedIds(newSelectedIds);
  };

  const handleToggleComplete = () => {
    setTodos((prev: Todo[]) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = () => {
    setTodos((prev: Todo[]) => prev.filter((t) => t.id !== todo.id));
  };

  const handleSaveEdit = (updatedTodo: Todo) => {
    setTodos((prev: Todo[]) =>
      prev.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
        isSelected
          ? 'bg-blue-50 border-blue-300'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <button
        onClick={handleToggleSelect}
        className="flex-shrink-0 focus:outline-none"
      >
        {isSelected ? (
          <div className="w-5 h-5 bg-blue-600 rounded border-2 border-blue-600 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        ) : (
          <div className="w-5 h-5 border-2 border-gray-300 rounded hover:border-gray-400" />
        )}
      </button>

      <button
        onClick={handleToggleComplete}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm transition-colors ${
            todo.completed
              ? 'text-gray-400 line-through'
              : 'text-gray-900'
          }`}
        >
          {todo.text}
        </p>
      </div>

      <button
        onClick={() => setIsEditOpen(true)}
        className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors focus:outline-none"
        title="Edit todo"
      >
        <Edit2 className="w-5 h-5" />
      </button>

      <button
        onClick={handleDelete}
        className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
        title="Delete todo"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <EditTodoModal
        todo={todo}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

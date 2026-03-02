import { TodoStore, useStore } from '../store';
import { Group, Todo } from '../types';
import { AddGroup } from './AddGroup';
import { Trash2, CheckCircle2 } from 'lucide-react';


export const Sidebar = () => {
  const activeGroup = useStore((s: TodoStore) => s.activeGroup);
  const setActiveGroup = useStore((s: TodoStore) => s.setActiveGroup);
  const groups = useStore((s: TodoStore) => s.groups);
  const setGroups = useStore((s: TodoStore) => s.setGroups);
  const todos = useStore((s: TodoStore) => s.todos);
  const setTodos = useStore((s: TodoStore) => s.setTodos);

  const handleDeleteGroup = (groupId: string) => {
    // Option 1: Cascading delete - removes all todos in the group
    // setTodos((prev) => prev.filter((todo) => todo.groupId !== groupId));
    
    // Option 2: Unlinking - removes todos from group but keeps them in "All"
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) =>
        todo.groupId === groupId ? { ...todo, groupId: null } : todo
      )
    );

    // Delete the group
    setGroups((prev: Group[]) => prev.filter((g) => g.id !== groupId));

    // If the deleted group was active, switch to "All"
    if (activeGroup === groupId) {
      setActiveGroup(null);
    }
  };

  // Count todos per group
  const getGroupTodoCount = (groupId: string) => {
    return todos.filter((todo: Todo) => todo.groupId === groupId).length;
  };

  const getTotalTodos = () => todos.length;
  const getCompletedCount = () => todos.filter((todo: Todo) => todo.completed).length;
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Todo App</h2>
      </div>

      {/* Stats */}
      <div className="p-4 mx-3 mt-4 bg-blue-50 rounded-lg text-sm">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{getCompletedCount()} completed</span>
        </div>
        <div className="text-gray-600">
          {getTotalTodos()} total todos
        </div>
      </div>

      {/* All Todos Filter */}
      <nav className="flex-1 p-4">
        <button
          onClick={() => setActiveGroup(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
            activeGroup === null
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          📋 All Todos
        </button>

        {/* Groups Section */}
        <div className="mt-6">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Groups
          </h3>

          <AddGroup />

          <div className="space-y-1">
            {groups.map((group: Group) => (
              <div
                key={group.id}
                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                  activeGroup === group.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <button
                  onClick={() => setActiveGroup(group.id)}
                  className="flex-1 text-left text-sm font-medium"
                >
                  <span className="inline-block mr-2">📁</span>
                  {group.name}
                  <span className="ml-2 text-xs text-gray-500">
                    ({getGroupTodoCount(group.id)})
                  </span>
                </button>
                <button
                  onClick={() => handleDeleteGroup(group.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                  title="Delete group"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Advanced Todo v1.0
      </div>
    </aside>
  );
};

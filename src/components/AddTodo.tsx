import React from 'react';
import { useState } from 'react';
import { useStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { Plus, ChevronDown } from 'lucide-react';
import { Group } from '../types';

export const AddTodo = () => {
  const [input, setInput] = useState('');
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

  const todos = useStore((s) => s.todos);
  const setTodos = useStore((s) => s.setTodos);
  const activeGroup = useStore((s) => s.activeGroup);
  const groups = useStore((s) => s.groups);

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    activeGroup,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        text: input.trim(),
        completed: false,
        groupId: selectedGroupId,
      },
    ]);
    setInput('');
    setIsGroupDropdownOpen(false);
  };

  const getGroupName = (groupId: string | null) => {
    if (groupId === null) return ""; // no label when no group is selected
    return groups.find((g: Group) => g.id === groupId)?.name || 'Unknown';
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Group Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-sm font-medium">
              {getGroupName(selectedGroupId)}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isGroupDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                type="button"
                onClick={() => {
                  setSelectedGroupId(null);
                  setIsGroupDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-lg"
              >
                📋 All Todos
              </button>
              {groups.map((group: Group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setSelectedGroupId(group.id);
                    setIsGroupDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  📁 {group.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </form>
  );
};

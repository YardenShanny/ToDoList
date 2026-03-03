import React from 'react';
import { useState } from 'react';
import { TodoStore, useStore } from '../store';
import { Todo, Group } from '../types';
import { X } from 'lucide-react';

interface EditTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

export const EditTodoModal = ({
  todo,
  isOpen,
  onClose,
  onSave,
}: EditTodoModalProps) => {
  const groups = useStore((s: TodoStore) => s.groups);
  const [text, setText] = useState(todo.text);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    todo.groupId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSave({
      ...todo,
      text: text.trim(),
      groupId: selectedGroupId,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Edit Todo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Todo Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter todo text..."
              autoFocus
            />
          </div>

          {/* Group Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Group
            </label>
            <select
              value={selectedGroupId || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedGroupId(e.target.value || null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Group (All)</option>
              {groups.map((group: Group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

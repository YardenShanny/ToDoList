import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState, activeGroupFilterState } from '../recoil/atoms';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

export const AddTodo = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useRecoilState(todoListState);
  const activeGroup = useRecoilValue(activeGroupFilterState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        text: input.trim(),
        completed: false,
        groupId: activeGroup,
      },
    ]);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

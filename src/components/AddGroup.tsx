import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { groupListState } from '../recoil/atoms';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

export const AddGroup = () => {
  const [input, setInput] = useState('');
  const setGroups = useSetRecoilState(groupListState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setGroups((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: input.trim(),
      },
    ]);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New group..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="text-blue-600 hover:text-blue-700 px-2 py-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

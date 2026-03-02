import { useRecoilValue } from 'recoil';
import { TodoItem } from './components/TodoItem';
import { BulkActionBar } from './components/BulkActionBar';
import { Sidebar } from './components/Sidebar';
import { AddTodo } from './components/AddTodo';
import { filteredTodosState, activeGroupNameState } from './recoil/selectors';
import { Todo } from './types';

function App() {
  const filteredTodos = useRecoilValue(filteredTodosState);
  const activeGroupName = useRecoilValue(activeGroupNameState);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto relative">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{activeGroupName}</h1>
          <p className="text-gray-600 mt-2">
            {filteredTodos.length} {filteredTodos.length === 1 ? 'todo' : 'todos'}
          </p>
        </header>

        <AddTodo />

        <div className="space-y-2 mb-20">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {filteredTodos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No todos here yet.</p>
              <p className="text-gray-400 text-sm mt-2">Create one to get started!</p>
            </div>
          )}
        </div>

        <BulkActionBar />
      </main>
    </div>
  );
}

export default App;
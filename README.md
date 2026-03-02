# Advanced Todo Application

A high-fidelity Todo application built with React, TypeScript, Recoil, and Tailwind CSS.

## Features

✨ **Core Functionalities:**
- ✅ Add, delete, and toggle todos (done/undone)
- 📁 Create groups, delete groups, and assign/remove todos from groups
- ☑️ Bulk actions: Select multiple todos to mark as done or delete in one click
- 🎯 Filter todos by group or view all todos
- 💾 Automatic localStorage persistence
- 📱 Clean, responsive, and modern UI with Tailwind CSS

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **State Management:** Recoil (Atoms & Selectors)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **IDs:** UUID v4

## Project Structure

```
src/
├── components/
│   ├── AddTodo.tsx          # Todo creation input
│   ├── AddGroup.tsx         # Group creation input
│   ├── TodoItem.tsx         # Individual todo row
│   ├── Sidebar.tsx          # Group management & filtering
│   └── BulkActionBar.tsx    # Bulk actions when items selected
├── recoil/
│   ├── atoms.ts             # State atoms with localStorage persistence
│   └── selectors.ts         # Derived state & computed values
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Main application component
├── main.tsx                 # Entry point
└── index.css               # Global styles with Tailwind directives
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Adding Todos
- Click the input field at the top and type your todo text
- Press Enter or click the "Add" button
- Todos are automatically added to the current group/filter

### Managing Groups
- Use the **Groups** section in the sidebar to create new groups
- Click on a group to filter todos by that group
- Click "📋 All Todos" to view all todos regardless of group
- Click the 🗑️ icon to delete a group (todos are unlinked, not deleted)

### Bulk Actions
- Click the checkboxes on the left of any todo to select it
- When todos are selected, a floating action bar appears at the bottom
- Use **Mark Done** to complete all selected todos
- Use **Delete** to remove all selected todos

### Marking Todos as Done
- Click the circle icon next to a todo to toggle its completion status
- Completed todos appear with a strikethrough and green checkmark

### Deleting Todos
- Click the 🗑️ icon on the right of any todo to delete it immediately
- Or select multiple todos and use the bulk delete action

## State Management Architecture

### Atoms (Source of Truth)
- `todoListState` - All todos in the app
- `groupListState` - All groups in the app
- `selectedTodoIdsState` - Currently selected todo IDs for bulk actions
- `activeGroupFilterState` - Currently active group filter (null = "All")

### Selectors (Derived Data)
- `filteredTodosState` - Todos filtered by active group
- `completionStatsState` - Statistics on completion percentage
- `activeGroupNameState` - Name of the currently active group

### Persistence
All atoms use localStorage effects to automatically persist changes:
- `todo_list` - Persists all todos
- `group_list` - Persists all groups

## Data Structures

```typescript
interface Todo {
  id: string;                  // UUID v4
  text: string;                // Todo description
  completed: boolean;          // Completion status
  groupId: string | null;      // Associated group (null = ungrouped)
}

interface Group {
  id: string;                  // UUID v4
  name: string;                // Group name
}
```

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter** when input is focused: Create new todo (add if implemented)

## Future Enhancements

- 🔄 Drag and drop to reorder todos
- 🏷️ Tags and labels for todos
- 🔔 Due dates and reminders
- 🔍 Search functionality
- 📊 Advanced statistics and charts
- 🌙 Dark mode toggle
- 📤 Export/Import todos
- 🤝 Collaborative editing

## License

MIT

## Contributing

Feel free to fork, open issues, and submit pull requests!

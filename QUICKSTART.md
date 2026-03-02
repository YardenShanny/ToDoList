# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd ToDoList
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app opens at `http://localhost:3000`

### Step 3: Start Using!

#### Create Your First Todo
1. Type in the input field: "Learn Recoil"
2. Press Enter or click **Add**
3. ✅ Done! Your todo appears in the list

#### Create a Group
1. In the sidebar, click in "New group..." input
2. Type: "Learning"
3. Press Enter
4. ✅ Group created!

#### Assign Todo to Group
1. Click on the "Learning" group in sidebar
2. Notice the header changes to "Learning"
3. Add a new todo
4. ✅ It's automatically assigned to "Learning" group

#### Mark as Done
1. Click the circle icon next to any todo
2. ✅ Todo turns green with checkmark
3. Text gets strikethrough

#### Delete Todo
1. Click the 🗑️ icon on any todo
2. ✅ Todo removed instantly

#### Bulk Operations
1. Click checkboxes on multiple todos
2. A floating action bar appears at bottom
3. Click **Mark Done** or **Delete**
4. ✅ All selected todos updated

#### Filter by Group
1. Click a group name in sidebar
2. Only todos from that group show
3. Click "📋 All Todos" to see everything

#### Delete Group
1. Click 🗑️ icon next to group name
2. Todos are unlinked (kept, not deleted)
3. ✅ Group removed

## File Structure

```
src/
├── components/          # React components
│   ├── AddGroup.tsx    # Create groups
│   ├── AddTodo.tsx     # Create todos
│   ├── BulkActionBar   # Bulk delete/done
│   ├── Sidebar.tsx     # Groups & filtering
│   └── TodoItem.tsx    # Individual todos
├── recoil/             # State management
│   ├── atoms.ts        # State atoms
│   └── selectors.ts    # Derived state
├── App.tsx             # Main component
├── types.ts            # TypeScript types
└── main.tsx            # Entry point
```

## Key Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## What's Happening Under the Hood?

### Recoil Atoms (State)
```typescript
// These hold the data:
- todoListState        // All todos
- groupListState       // All groups
- activeGroupFilterState  // Active filter
- selectedTodoIdsState    // Selected for bulk ops
```

### Selectors (Derived Data)
```typescript
// These compute from atoms:
- filteredTodosState   // Todos for current group
- activeGroupNameState // Name of active group
- completionStatsState // Done/total counts
```

### Persistence
```typescript
// AtomEffects auto-save to localStorage:
localStorage.todo_list   // [{ id, text, completed, groupId }]
localStorage.group_list  // [{ id, name }]
```

## Common Tasks

### Refresh Page
- ✅ Todos persist via localStorage
- ✅ Groups persist via localStorage
- ✅ No data loss

### See All Stats
- Look at sidebar top box
- Shows completed count and total

### Start Fresh
- Open DevTools → Application → Storage → LocalStorage
- Delete `todo_list` and `group_list` entries
- Refresh page

## Troubleshooting

### Todos Not Showing?
- Check browser console for errors
- Verify localStorage is enabled
- Try refreshing page

### Group Not Appearing?
- Make sure name isn't empty
- Check sidebar "Groups" section
- Count should update

### Bulk Actions Not Working?
- Click checkboxes (not the todo row)
- Select at least 2 todos
- Action bar should appear at bottom

## Next Steps

1. **Customize Styling:** Edit colors in Tailwind config
2. **Add Features:** Implement due dates, priority levels
3. **Dark Mode:** Add theme toggle
4. **Search:** Add search filter in header

## Need Help?

Check these files:
- `README.md` - Full feature documentation
- `ARCHITECTURE.md` - Deep dive into design
- `src/types.ts` - Data structure definitions
- `src/recoil/atoms.ts` - State management

## Tips & Tricks

- 💡 Groups help organize todos by project
- 💡 Bulk actions save time with many todos
- 💡 Data saves automatically—no need to click save
- 💡 Works offline thanks to localStorage
- 💡 Try keyboard shortcuts: Tab through inputs

---

**Happy Todo-ing!** 🚀

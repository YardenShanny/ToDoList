# Advanced Todo Application - Architecture Guide

## Overview

This document explains the architectural decisions and design patterns used in the Advanced Todo Application.

## State Management with Recoil

### Why Recoil?

We chose Recoil because:

1. **Fine-grained Reactivity:** Only components that depend on changed atoms re-render
2. **Selectors for Derived State:** Complex computations are memoized automatically
3. **Built-in Persistence:** AtomEffects enable easy localStorage integration
4. **Minimal Boilerplate:** Compared to Redux, setup is simpler and more declarative
5. **Flexible Data Flow:** Works great with relational data (todos + groups)

### Atom Structure

```
┌─────────────────────────────────────────┐
│         ATOMS (Source of Truth)         │
├─────────────────────────────────────────┤
│ • todoListState: Todo[]                 │
│ • groupListState: Group[]               │
│ • selectedTodoIdsState: string[]        │
│ • activeGroupFilterState: string|null   │
└─────────────────────────────────────────┘
         │
         ├─ localStorage Persistence
         │  (AtomEffect automatically syncs)
         │
         └─ Component Updates
            (via useRecoilState/useRecoilValue)
```

### Selector Structure

```
┌────────────────────────────────────────────┐
│    SELECTORS (Derived/Computed State)     │
├────────────────────────────────────────────┤
│ • filteredTodosState                       │
│   └─ Derived from: todoListState,          │
│      activeGroupFilterState                │
│                                            │
│ • completionStatsState                     │
│   └─ Derived from: todoListState           │
│                                            │
│ • activeGroupNameState                     │
│   └─ Derived from: activeGroupFilterState, │
│      groupListState                        │
└────────────────────────────────────────────┘
         │
         └─ Auto-memoized by Recoil
```

## Component Architecture

### Component Tree

```
App (Root)
├── Sidebar
│   ├── Stats Display
│   ├── All Todos Button
│   ├── Groups List
│   │   ├── AddGroup
│   │   └── GroupItem[] (with delete)
│   └── Footer
│
└── Main Content
    ├── Header (with title & count)
    ├── AddTodo (input form)
    ├── TodoList
    │   └── TodoItem[]
    │       ├── Select Checkbox
    │       ├── Complete Toggle
    │       ├── Todo Text
    │       └── Delete Button
    │
    └── BulkActionBar (conditionally rendered)
        ├── Selection Count
        ├── Mark Done Button
        └── Delete Button
```

### Component Responsibilities

#### **App.tsx** (Container)
- Renders layout structure
- Integrates Sidebar and main content
- Uses selectors to get filtered todos and group names

#### **Sidebar.tsx** (Container)
- Manages group filtering
- Displays completion statistics
- Handles group deletion with unlinking behavior
- Shows todo counts per group

#### **AddTodo.tsx** (Form Component)
- Provides input for creating new todos
- Automatically assigns to active group
- Uses Recoil to update todoListState

#### **AddGroup.tsx** (Form Component)
- Provides input for creating new groups
- Adds to groupListState on submit

#### **TodoItem.tsx** (Presentational)
- Displays individual todo
- Handles:
  - Selection checkbox
  - Completion toggle
  - Deletion
- Highly reusable and pure

#### **BulkActionBar.tsx** (Container)
- Conditionally renders when items selected
- Provides bulk operations:
  - Mark all selected as done
  - Delete all selected
- Resets selection after action

## Data Flow Patterns

### Adding a Todo

```
User Types in AddTodo Input
        ↓
User Clicks "Add" Button
        ↓
Submission Handler:
  1. Creates Todo object with UUID
  2. Gets activeGroupFilterState
  3. Updates todoListState
        ↓
AtomEffect catches change
  ├─ Serializes to JSON
  └─ Writes to localStorage
        ↓
App subscribes to todoListState
        ↓
filteredTodosState selector
  recalculates
        ↓
TodoItem components re-render
```

### Filtering Todos by Group

```
User Clicks Group in Sidebar
        ↓
setActiveGroup(groupId)
        ↓
activeGroupFilterState updates
        ↓
filteredTodosState selector
  recalculates with new filter
        ↓
Dependent components re-render
  (App title, todo list, etc.)
```

### Bulk Delete Operation

```
User Selects Multiple Todos
        ↓
Each click updates selectedTodoIdsState
        ↓
BulkActionBar renders (selectedIds.length > 0)
        ↓
User Clicks Delete Button
        ↓
Handler filters out selected IDs
        ↓
todoListState updates
        ↓
AtomEffect persists to localStorage
        ↓
Reset selectedTodoIdsState
        ↓
BulkActionBar disappears (selectedIds = [])
```

## Persistence Strategy

### localStorage Key Structure

```
localStorage = {
  "todo_list": [
    { id, text, completed, groupId },
    ...
  ],
  "group_list": [
    { id, name },
    ...
  ]
}
```

### How AtomEffect Works

```typescript
const localStorageEffect = <T>(key: string): AtomEffect<T> => 
  ({ setSelf, onSet }) => {
    // On atom creation: Restore from localStorage
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // On atom change: Persist to localStorage
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
```

This ensures:
- ✅ Data survives page refresh
- ✅ Changes sync automatically
- ✅ No manual useEffect hooks needed
- ✅ Clean separation of concerns

## TypeScript Strategy

### Strict Mode Enabled

All TypeScript compiler options enforced:
- `strict: true` - Strictest type checking
- `noUnusedLocals: true` - No dead code
- `noUnusedParameters: true` - Clean function signatures
- `noFallthroughCasesInSwitch: true` - Safe switch statements

### Interface Hierarchy

```typescript
// Fundamental types
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  groupId: string | null;
}

interface Group {
  id: string;
  name: string;
}

// Component Props (type-safe)
interface TodoItemProps {
  todo: Todo;
}

// Derived types (from selectors)
interface CompletionStats {
  completed: number;
  total: number;
  percentage: number;
}
```

## UI/UX Design Principles

### Visual Hierarchy

1. **Sidebar:** Context and navigation (fixed)
2. **Main Content:** Primary interaction (scrollable)
3. **Header:** Orientation (sticky)
4. **Action Bar:** Secondary actions (floating)

### Interaction Patterns

1. **Inline Actions:** Delete buttons on each item
2. **Toggle Actions:** Click to complete/uncomplete
3. **Bulk Actions:** Select multiple, act on all
4. **Form Input:** Add new items at the top
5. **Filtering:** Sidebar groups for quick views

### Accessibility

- ✅ Semantic HTML structure
- ✅ Focus states on buttons
- ✅ Clear visual feedback on interactions
- ✅ Keyboard-accessible inputs
- ✅ Color not the only indicator

## Performance Optimizations

1. **Selector Memoization:** Recoil caches selector results
2. **Filtered Lists:** Only selected group's todos render
3. **React Strict Mode:** Detects potential issues
4. **TypeScript:** Compile-time error prevention
5. **Tailwind CSS:** Zero-runtime styling

## Error Handling

Current implementation assumes:
- Valid UUID generation (crypto.randomUUID)
- No concurrent modifications
- localStorage is available

Future improvements could add:
- Try-catch in localStorage operations
- Sync conflict resolution
- User notifications for errors
- Fallback to in-memory state

## Scaling Considerations

### If Adding Features:

**Real-time Sync:**
```
Replace localStorage with Firebase/Supabase
- Keep same Atom structure
- Use new persistence effect
- No component changes needed
```

**Undo/Redo:**
```
Add to Recoil devtools
or create custom history atom
```

**Performance with 10k+ Todos:**
```
Add pagination/virtualization
- Use a selector for paginated slice
- Render only visible items
- Keep all data in atoms
```

## Testing Strategy

### Unit Tests
- Test selectors in isolation
- Mock atom values

### Component Tests
- Test with RecoilRoot wrapper
- Verify UI updates on state changes
- Test user interactions

### Integration Tests
- Test full data flow
- Verify localStorage sync
- Test bulk operations

## Summary

The architecture prioritizes:

1. **Clarity:** Clear data flow, easy to understand
2. **Maintainability:** Separation of concerns, single responsibility
3. **Scalability:** Easy to add features without breaking changes
4. **Performance:** Efficient rendering and state updates
5. **Type Safety:** Strict TypeScript throughout
6. **User Experience:** Responsive, intuitive interface

The combination of Recoil atoms + selectors + localStorage effects creates a robust, simple, and maintainable state management solution.

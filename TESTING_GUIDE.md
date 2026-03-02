# Testing Guide - New Edit & Group Features

## Quick Start Testing

### Setup
```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Test Scenarios

### Scenario 1: Create a Todo

**Steps:**
1. Type "Learn TypeScript" in the input field
2. Click the "All Todos" dropdown
3. Leave it as "All Todos" (default)
4. Click "Add" button

**Expected Result:**
✅ Todo appears in the list
✅ Text shows "Learn TypeScript"
✅ Circle icon (uncompleted)
✅ Can see edit (✏️) and delete (🗑️) buttons

---

### Scenario 2: Create a Group

**Steps:**
1. In the sidebar, go to "Groups" section
2. Type "Work" in the "New group..." input
3. Press Enter or click the plus icon

**Expected Result:**
✅ New group "Work" appears in sidebar
✅ Shows count "(0)"
✅ Can click to filter by group

---

### Scenario 3: Create Todo in Specific Group

**Steps:**
1. Click the "All Todos" dropdown in the add form
2. Click "📁 Work" from the dropdown list
3. Type "Finish project proposal"
4. Click "Add" button

**Expected Result:**
✅ Todo created
✅ Only visible when "Work" group is selected
✅ Sidebar shows count increased for Work group
✅ Not visible in other groups

---

### Scenario 4: Edit Todo Text

**Steps:**
1. Find the todo "Learn TypeScript"
2. Click the ✏️ (edit) button
3. Modal opens
4. Clear the text and type "Master TypeScript & React"
5. Click "Save Changes"

**Expected Result:**
✅ Modal closes
✅ Todo text updates to "Master TypeScript & React"
✅ Edit appears in the list
✅ Refresh page → text persists

---

### Scenario 5: Move Todo to Different Group

**Steps:**
1. Find "Finish project proposal" in Work group
2. Click ✏️ button
3. Modal opens
4. Click the "Assign to Group" dropdown
5. Select "Personal"
6. Click "Save Changes"

**Expected Result:**
✅ Modal closes
✅ Todo disappears from Work group view
✅ Work group count decreases
✅ Click "Personal" group → todo appears
✅ Personal group count increased

---

### Scenario 6: Remove Todo from Group

**Steps:**
1. Edit any grouped todo
2. Click "Assign to Group" dropdown
3. Select "No Group (All)"
4. Click "Save Changes"

**Expected Result:**
✅ Todo no longer assigned to specific group
✅ Still appears in "All Todos" view
✅ Not visible when filtering by groups
✅ Group count decreases

---

### Scenario 7: Edit Both Text and Group

**Steps:**
1. Click ✏️ on any todo
2. Change the text: "Updated todo text"
3. Click group dropdown and select different group
4. Click "Save Changes"

**Expected Result:**
✅ Text updates
✅ Group changes
✅ Both changes appear in list
✅ Correct group filtering works

---

### Scenario 8: Close Modal Without Saving

**Steps:**
1. Click ✏️ on a todo
2. Modal opens
3. Make changes (text/group)
4. Click "Cancel" button

**Expected Result:**
✅ Modal closes
✅ Todo unchanged
✅ Original text still showing
✅ Original group still assigned

---

### Scenario 9: Close Modal with X Button

**Steps:**
1. Click ✏️ on a todo
2. Modal opens
3. Make changes
4. Click X button (top right)

**Expected Result:**
✅ Modal closes
✅ Changes discarded
✅ Todo unchanged

---

### Scenario 10: Empty Text Validation

**Steps:**
1. Click ✏️ on a todo
2. Clear all text (leave empty)
3. Click "Save Changes"

**Expected Result:**
✅ Save button disabled (or form not submitted)
✅ Modal stays open
✅ Text field highlights (shows error state)

---

## Advanced Test Scenarios

### Scenario 11: Group Dropdown in Add Form

**Steps:**
1. Click "All Todos" dropdown multiple times
2. Dropdown should toggle open/closed
3. Click outside dropdown (optional)
4. Dropdown should close

**Expected Result:**
✅ Dropdown opens when clicked
✅ All groups listed
✅ "All Todos" option at top
✅ Can select multiple times in same session
✅ Selection persists until changed

---

### Scenario 12: Create Multiple Todos in One Group

**Steps:**
1. Select "Work" group from dropdown
2. Type "Task 1" and click Add
3. Type "Task 2" and click Add
4. Type "Task 3" and click Add

**Expected Result:**
✅ All 3 todos created
✅ Dropdown stays on "Work"
✅ All visible in Work group view
✅ Work count shows 3
✅ Each has own edit/delete buttons

---

### Scenario 13: Bulk Operations with Edited Todo

**Steps:**
1. Edit a todo text to something new
2. Select it (checkbox)
3. Edit again while selected
4. Modal opens and closes
5. Selection still active

**Expected Result:**
✅ Edit doesn't affect selection
✅ Selection state preserved
✅ Can still bulk delete/complete

---

### Scenario 14: Complete Todo and Edit

**Steps:**
1. Click circle icon to mark todo complete (green checkmark)
2. Click ✏️ to edit
3. Modal opens (should show completed status isn't in modal)
4. Change text
5. Save

**Expected Result:**
✅ Modal opens correctly
✅ Completed status preserved
✅ Text updates
✅ Still shows as completed after edit

---

### Scenario 15: Data Persistence Test

**Steps:**
1. Create multiple todos in different groups
2. Edit some todos (text and group)
3. Close the browser completely
4. Reopen the application
5. Go to http://localhost:3000

**Expected Result:**
✅ All todos still present
✅ Text changes saved
✅ Group assignments saved
✅ No data loss

---

## Edge Case Tests

### Edge Case 1: Very Long Todo Text

**Steps:**
1. Click ✏️ on a todo
2. Type very long text (300+ characters)
3. Save

**Expected Result:**
✅ Text accepted
✅ Displays with text wrapping
✅ Persists to localStorage

---

### Edge Case 2: Special Characters in Text

**Steps:**
1. Edit todo with: "Test @#$%^&*()_+-="
2. Save
3. Refresh page

**Expected Result:**
✅ Special characters preserved
✅ No encoding issues

---

### Edge Case 3: Rapid Group Changes

**Steps:**
1. Click ✏️ on todo
2. Quickly click dropdown multiple times
3. Select different groups rapidly

**Expected Result:**
✅ No errors
✅ Final selection correct
✅ Stable after save

---

### Edge Case 4: Many Groups

**Steps:**
1. Create 10+ groups
2. Click group dropdown in add form
3. Scroll through dropdown

**Expected Result:**
✅ All groups visible
✅ No performance issues
✅ Scrollable if needed

---

## Keyboard Navigation Tests

### Test: Tab Through Form

**Steps:**
1. Open edit modal
2. Press Tab repeatedly
3. Focus should move: Text → Group → Cancel → Save → Close

**Expected Result:**
✅ Focus rings visible
✅ All interactive elements reachable
✅ Tab order logical

---

### Test: Enter in Text Field

**Steps:**
1. Edit modal open
2. Type in text field
3. Press Enter

**Expected Result:**
✅ Form submits (saves)
✅ Modal closes

---

### Test: Enter in Dropdown

**Steps:**
1. Click group dropdown
2. Press Tab to highlight option
3. Press Enter

**Expected Result:**
✅ Option selects
✅ Dropdown closes (optional)

---

## Visual Tests

### Color & Styling

**Check:**
- [ ] Edit button gray normally, blue on hover
- [ ] Delete button gray normally, red on hover
- [ ] Dropdown has blue focus ring
- [ ] Modal has dark overlay
- [ ] Buttons have proper padding
- [ ] Form fields have proper borders

---

### Icons

**Check:**
- [ ] ✏️ Edit icon displays correctly
- [ ] 🗑️ Delete icon displays correctly
- [ ] ▼ Chevron displays in dropdown
- [ ] ✕ Close button displays in modal

---

### Spacing

**Check:**
- [ ] Gap between buttons (2px = gap-2)
- [ ] Padding in forms (4px = p-4)
- [ ] Margin in sections (6px = mb-6)
- [ ] Modal has proper centering

---

## Performance Tests

### Test: Many Todos

**Steps:**
1. Create 100+ todos (manually add several)
2. Edit a todo
3. Create a group and move todos
4. Filter by group

**Expected Result:**
✅ No lag
✅ Smooth interactions
✅ Modal opens instantly
✅ No dropped frames

---

### Test: localStorage Size

**Steps:**
1. Add 50+ todos
2. Create 10 groups
3. Check DevTools Application tab
4. Look at localStorage

**Expected Result:**
✅ Data stored in "todo_list" key
✅ Data stored in "group_list" key
✅ Reasonable size (under 1MB)

---

## Accessibility Tests

### Test: Screen Reader (if available)

**Expected:**
- [ ] Labels read correctly
- [ ] Buttons have descriptive names
- [ ] Form fields identified
- [ ] Modal announced

---

### Test: Zoom at 200%

**Steps:**
1. Set browser zoom to 200%
2. Navigate and edit todos

**Expected Result:**
✅ Layout still usable
✅ No horizontal scroll needed
✅ Buttons clickable

---

## Regression Tests

### Make Sure Existing Features Still Work

**Existing Feature Tests:**
- [ ] Create todo without using group selector
- [ ] Delete todo works
- [ ] Toggle complete (circle/checkmark) works
- [ ] Bulk select works
- [ ] Bulk delete works
- [ ] Bulk mark complete works
- [ ] Filter by group works
- [ ] Delete group works
- [ ] Create group works
- [ ] Sidebar displays correctly

---

## Test Checklist

```
Core Features:
  [ ] Edit todo text works
  [ ] Edit todo group works
  [ ] Create with group works
  [ ] Modal opens/closes
  [ ] Form validates
  [ ] Changes persist

Interactions:
  [ ] Dropdown toggle works
  [ ] Button clicks respond
  [ ] Focus visible
  [ ] Hover states work

Data:
  [ ] Changes save to state
  [ ] localStorage syncs
  [ ] Refresh persists data
  [ ] No data loss

UI/UX:
  [ ] Colors correct
  [ ] Icons display
  [ ] Spacing correct
  [ ] Modal centered
  [ ] Responsive design

Accessibility:
  [ ] Keyboard navigable
  [ ] Focus rings visible
  [ ] Labels present
  [ ] Color contrast OK

Performance:
  [ ] No lag
  [ ] Smooth animations
  [ ] Modal instant
  [ ] No memory issues

Edge Cases:
  [ ] Long text OK
  [ ] Special characters OK
  [ ] Empty text rejected
  [ ] Many groups OK
```

---

## Reporting Issues

If you find a bug:

1. **Note the steps** to reproduce
2. **Check browser console** (F12) for errors
3. **Clear localStorage** if weird behavior:
   ```javascript
   localStorage.clear()
   location.reload()
   ```
4. **Test in incognito mode** (rules out extensions)
5. **Check TypeScript errors** in terminal

---

## Success Criteria

✅ **All tests pass** = Features working correctly

✅ **No console errors** = Code quality good

✅ **Data persists** = localStorage working

✅ **Smooth interactions** = UX is good

✅ **Keyboard works** = Accessibility OK

---

**Happy testing!** 🚀

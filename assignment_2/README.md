# Testing Guidance for React To-Do List

## Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to launch the application
4. Open http://localhost:3000 in your browser

## Manual Testing Steps

### Basic Functionality
1. **Add Task**: Enter "Buy groceries" and click "Add" - task should appear in list
2. **Complete Task**: Click the circle (⭕) next to a task - should become ✅ and text should be crossed out
3. **Delete Task**: Click "Delete" button - task should be removed from list

### Input Validation
1. **Empty Task**: Try adding empty task - should show error message
2. **Long Task**: Enter 101+ characters - should show character limit error
3. **Whitespace**: Enter only spaces - should show error message

### Filtering & Sorting
1. **Filter**: Select "Completed" from filter dropdown - only completed tasks shown
2. **Sort**: Change sort to "Alphabetical" - tasks should reorder A-Z
3. **Stats**: Verify task counts update correctly as you add/complete tasks

### Data Persistence
1. **Refresh Test**: Add tasks, refresh page - tasks should persist
2. **Browser Storage**: Check developer tools > Application > Local Storage for saved data

## Expected Results
- All features work without console errors
- UI updates immediately when tasks change
- Data persists across browser sessions
- Error messages appear for invalid inputs

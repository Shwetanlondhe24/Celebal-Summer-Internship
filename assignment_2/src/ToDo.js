import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('todoTasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        // Ensure dates are properly parsed
        const tasksWithDates = parsedTasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        setTasks(tasksWithDates);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      setError('Failed to load saved tasks');
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      setError('Failed to save tasks');
    }
  }, [tasks]);

  const addTask = () => {
    if (!inputValue.trim()) {
      setError('Task cannot be empty');
      return;
    }
    if (inputValue.length > 100) {
      setError('Task must be less than 100 characters');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setInputValue('');
    setError('');
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];
    
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }
    
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
    }
    
    return filtered;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-container">
      <h1>📝 Todo List</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="✏️ Enter a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">➕ Add</button>
      </div>
      
      {error && <div className="error">⚠️ {error}</div>}
      
      <div className="controls">
        <div className="filter-section">
          <label>🔍 Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">📋 All</option>
            <option value="pending">⏳ Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
        
        <div className="sort-section">
          <label>🔄 Sort: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">🆕 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="alphabetical">🔤 Alphabetical</option>
          </select>
        </div>
      </div>
      
      <div className="task-stats">
        📊 Total: {tasks.length} | ✅ Completed: {tasks.filter(t => t.completed).length} | 
        ⏳ Pending: {tasks.filter(t => !t.completed).length}
      </div>
      
      <ul className="task-list">
        {getFilteredTasks().map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-checkbox" onClick={() => toggleComplete(task.id)}>
              {task.completed ? '✅' : '⭕'}
            </span>
            <span 
              className="task-text" 
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button 
              onClick={() => removeTask(task.id)} 
              className="delete-btn"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
      
      {getFilteredTasks().length === 0 && (
        <div className="empty-state">📭 No tasks found</div>
      )}
    </div>
  );
};

export default TodoList;
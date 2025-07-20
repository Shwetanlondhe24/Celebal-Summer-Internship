import React, { useState } from 'react';
import '../styles/Kanban.css';

const Kanban = () => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Design new landing page', description: 'Create wireframes and mockups', priority: 'high', assignee: 'John Doe' },
        { id: '2', title: 'Setup development environment', description: 'Configure local development setup', priority: 'medium', assignee: 'Jane Smith' },
        { id: '3', title: 'Write project documentation', description: 'Create comprehensive project docs', priority: 'low', assignee: 'Mike Johnson' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '4', title: 'Implement user authentication', description: 'Add login and registration functionality', priority: 'high', assignee: 'Sarah Wilson' },
        { id: '5', title: 'Create API endpoints', description: 'Develop REST API for the application', priority: 'medium', assignee: 'Tom Brown' }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        { id: '6', title: 'Code review for dashboard', description: 'Review and test dashboard components', priority: 'medium', assignee: 'Lisa Davis' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '7', title: 'Project setup completed', description: 'Initial project structure is ready', priority: 'high', assignee: 'David Miller' },
        { id: '8', title: 'Database schema design', description: 'Completed database design and setup', priority: 'medium', assignee: 'Emma Garcia' }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: ''
  });

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ task, sourceColumnId: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const { task, sourceColumnId } = draggedTask;
    
    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    setColumns(prev => {
      const newColumns = prev.map(column => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter(t => t.id !== task.id)
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, task]
          };
        }
        return column;
      });
      return newColumns;
    });

    setDraggedTask(null);
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now().toString(),
        ...newTask
      };

      setColumns(prev => prev.map(column => 
        column.id === selectedColumn
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      ));

      setNewTask({ title: '', description: '', priority: 'medium', assignee: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteTask = (taskId, columnId) => {
    setColumns(prev => prev.map(column => 
      column.id === columnId
        ? { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
        : column
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getTaskStats = () => {
    const stats = columns.reduce((acc, column) => {
      acc[column.id] = column.tasks.length;
      acc.total += column.tasks.length;
      return acc;
    }, { total: 0 });
    return stats;
  };

  const stats = getTaskStats();

  return (
    <div className="kanban">
      <div className="kanban-header">
        <div className="header-left">
          <h2>Project Board</h2>
          <div className="board-stats">
            <span className="stat-item">Total: {stats.total}</span>
            <span className="stat-item">To Do: {stats.todo}</span>
            <span className="stat-item">In Progress: {stats['in-progress']}</span>
            <span className="stat-item">Done: {stats.done}</span>
          </div>
        </div>
        <button 
          className="add-task-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Task
        </button>
      </div>

      <div className="kanban-board">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header">
              <h3>{column.title}</h3>
              <span className="task-count">{column.tasks.length}</span>
            </div>
            
            <div className="column-content">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                >
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <button 
                      className="delete-task"
                      onClick={() => handleDeleteTask(task.id, column.id)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <p className="task-description">{task.description}</p>
                  
                  <div className="task-footer">
                    <div className="task-meta">
                      <span 
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                      <span className="task-assignee">👤 {task.assignee}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {column.tasks.length === 0 && (
                <div className="empty-column">
                  <p>No tasks yet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="task-modal">
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Column</label>
                  <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                  >
                    {columns.map(column => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  placeholder="Enter assignee name"
                />
              </div>
              
              <div className="modal-actions">
                <button onClick={handleAddTask} className="save-btn">
                  Add Task
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
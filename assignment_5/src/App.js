import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import Charts from './components/Charts';
import Calendar from './components/Calendar';
import Kanban from './components/Kanban';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <Tables />;
      case 'charts':
        return <Charts />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <Kanban />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
          <Header
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            currentPage={activeComponent}
          />
          <div className="content">
            {renderComponent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
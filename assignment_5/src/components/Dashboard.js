import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12,345', change: '+12%', icon: '👥' },
    { title: 'Revenue', value: '$45,678', change: '+8%', icon: '💰' },
    { title: 'Orders', value: '3,456', change: '+23%', icon: '📦' },
    { title: 'Growth', value: '23.5%', change: '+5%', icon: '📈' }
  ];

  const recentActivities = [
    { id: 1, action: 'New user registration', user: 'John Doe', time: '5 min ago' },
    { id: 2, action: 'Order completed', user: 'Jane Smith', time: '12 min ago' },
    { id: 3, action: 'Payment received', user: 'Mike Johnson', time: '25 min ago' },
    { id: 4, action: 'Support ticket opened', user: 'Sarah Wilson', time: '1 hour ago' },
    { id: 5, action: 'Product updated', user: 'Admin', time: '2 hours ago' }
  ];

  const quickActions = [
    { title: 'Add User', icon: '➕', action: () => console.log('Add user') },
    { title: 'Generate Report', icon: '📊', action: () => console.log('Generate report') },
    { title: 'Send Newsletter', icon: '📧', action: () => console.log('Send newsletter') },
    { title: 'Backup Data', icon: '💾', action: () => console.log('Backup data') }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-user">by {activity.user}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button 
                key={index} 
                className="quick-action-btn"
                onClick={action.action}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-title">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Performance Overview</h3>
          <div className="simple-chart">
            <div className="chart-bars">
              {[65, 45, 78, 52, 89, 43, 67].map((height, index) => (
                <div 
                  key={index} 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import '../styles/Charts.css';

const Charts = () => {
  const [selectedChart, setSelectedChart] = useState('line');

  const lineChartData = [
    { month: 'Jan', sales: 65, revenue: 45 },
    { month: 'Feb', sales: 59, revenue: 52 },
    { month: 'Mar', sales: 80, revenue: 68 },
    { month: 'Apr', sales: 81, revenue: 75 },
    { month: 'May', sales: 56, revenue: 48 },
    { month: 'Jun', sales: 89, revenue: 82 }
  ];

  const barChartData = [
    { category: 'Desktop', value: 45 },
    { category: 'Mobile', value: 35 },
    { category: 'Tablet', value: 20 }
  ];

  const pieChartData = [
    { label: 'Marketing', value: 35, color: '#007bff' },
    { label: 'Development', value: 25, color: '#28a745' },
    { label: 'Design', value: 20, color: '#ffc107' },
    { label: 'Support', value: 20, color: '#dc3545' }
  ];

  const LineChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.revenue)));
    
    return (
      <div className="line-chart">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color sales"></span>
            <span>Sales</span>
          </div>
          <div className="legend-item">
            <span className="legend-color revenue"></span>
            <span>Revenue</span>
          </div>
        </div>
        
        <div className="chart-area">
          <svg viewBox="0 0 400 200" className="chart-svg">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="40"
                y1={40 + i * 32}
                x2="380"
                y2={40 + i * 32}
                stroke="var(--border-color)"
                strokeWidth="1"
              />
            ))}
            
            {/* Sales line */}
            <polyline
              fill="none"
              stroke="var(--accent-color)"
              strokeWidth="3"
              points={data.map((d, i) => 
                `${60 + i * 55},${180 - (d.sales / maxValue) * 140}`
              ).join(' ')}
            />
            
            {/* Revenue line */}
            <polyline
              fill="none"
              stroke="#28a745"
              strokeWidth="3"
              points={data.map((d, i) => 
                `${60 + i * 55},${180 - (d.revenue / maxValue) * 140}`
              ).join(' ')}
            />
            
            {/* Data points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle
                  cx={60 + i * 55}
                  cy={180 - (d.sales / maxValue) * 140}
                  r="4"
                  fill="var(--accent-color)"
                />
                <circle
                  cx={60 + i * 55}
                  cy={180 - (d.revenue / maxValue) * 140}
                  r="4"
                  fill="#28a745"
                />
                <text
                  x={60 + i * 55}
                  y="195"
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {d.month}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bar-chart">
        <div className="bars-container">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div 
                className="bar"
                style={{ 
                  height: `${(item.value / maxValue) * 200}px`,
                  backgroundColor: 'var(--accent-color)'
                }}
              >
                <span className="bar-value">{item.value}%</span>
              </div>
              <span className="bar-label">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChart = ({ data }) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="pie-chart">
        <svg viewBox="0 0 200 200" className="pie-svg">
          {data.map((slice, index) => {
            const startAngle = cumulativePercentage * 3.6;
            const endAngle = (cumulativePercentage + slice.value) * 3.6;
            const largeArcFlag = slice.value > 50 ? 1 : 0;
            
            const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'z'
            ].join(' ');
            
            cumulativePercentage += slice.value;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={slice.color}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        <div className="pie-legend">
          {data.map((slice, index) => (
            <div key={index} className="pie-legend-item">
              <span 
                className="legend-color"
                style={{ backgroundColor: slice.color }}
              ></span>
              <span>{slice.label}: {slice.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Analytics Charts</h2>
        <div className="chart-selector">
          <button 
            className={selectedChart === 'line' ? 'active' : ''}
            onClick={() => setSelectedChart('line')}
          >
            Line Chart
          </button>
          <button 
            className={selectedChart === 'bar' ? 'active' : ''}
            onClick={() => setSelectedChart('bar')}
          >
            Bar Chart
          </button>
          <button 
            className={selectedChart === 'pie' ? 'active' : ''}
            onClick={() => setSelectedChart('pie')}
          >
            Pie Chart
          </button>
        </div>
      </div>

      <div className="chart-container">
        {selectedChart === 'line' && (
          <div className="chart-card">
            <h3>Sales & Revenue Trends</h3>
            <LineChart data={lineChartData} />
          </div>
        )}
        
        {selectedChart === 'bar' && (
          <div className="chart-card">
            <h3>Device Usage Statistics</h3>
            <BarChart data={barChartData} />
          </div>
        )}
        
        {selectedChart === 'pie' && (
          <div className="chart-card">
            <h3>Budget Distribution</h3>
            <PieChart data={pieChartData} />
          </div>
        )}
      </div>

      <div className="chart-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h4>Total Revenue</h4>
            <p className="metric-value">$124,563</p>
            <span className="metric-change positive">+12.5%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h4>Active Users</h4>
            <p className="metric-value">8,492</p>
            <span className="metric-change positive">+8.3%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h4>Growth Rate</h4>
            <p className="metric-value">23.7%</p>
            <span className="metric-change positive">+5.2%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h4>Conversion Rate</h4>
            <p className="metric-value">4.2%</p>
            <span className="metric-change negative">-0.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
import React, { useState } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, date: '2025-06-15', title: 'Team Meeting', type: 'meeting' },
    { id: 2, date: '2025-06-18', title: 'Project Deadline', type: 'deadline' },
    { id: 3, date: '2025-06-22', title: 'Client Presentation', type: 'presentation' },
    { id: 4, date: '2025-06-25', title: 'Code Review', type: 'review' },
    { id: 5, date: '2025-06-28', title: 'Holiday', type: 'holiday' }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'meeting', date: '' });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: Date.now(),
        ...newEvent
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', type: 'meeting', date: '' });
      setShowEventModal(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateEvents = getEventsForDate(date);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {dateEvents.length > 0 && (
            <div className="event-indicators">
              {dateEvents.slice(0, 2).map(event => (
                <div
                  key={event.id}
                  className={`event-dot ${event.type}`}
                  title={event.title}
                ></div>
              ))}
              {dateEvents.length > 2 && (
                <div className="event-more">+{dateEvents.length - 2}</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <button 
          className="add-event-btn"
          onClick={() => setShowEventModal(true)}
        >
          Add Event
        </button>
      </div>

      <div className="calendar-content">
        <div className="calendar-main">
          <div className="calendar-nav">
            <button onClick={() => navigateMonth(-1)}>‹</button>
            <h3>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <button onClick={() => navigateMonth(1)}>›</button>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {weekdays.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="selected-date-info">
            {selectedDate ? (
              <div>
                <h4>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <div className="date-events">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className={`event-item ${event.type}`}>
                      <span className="event-title">{event.title}</span>
                      <button 
                        className="delete-event-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="no-events">No events for this date</p>
                  )}
                </div>
              </div>
            ) : (
              <p>Select a date to view events</p>
            )}
          </div>

          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            <div className="upcoming-list">
              {getUpcomingEvents().map(event => (
                <div key={event.id} className={`upcoming-event ${event.type}`}>
                  <div className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="event-details">
                    <span className="event-title">{event.title}</span>
                    <span className="event-type">{event.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEventModal && (
        <div className="modal-overlay">
          <div className="event-modal">
            <div className="modal-header">
              <h3>Add New Event</h3>
              <button 
                className="close-modal"
                onClick={() => setShowEventModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="presentation">Presentation</option>
                  <option value="review">Review</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button onClick={handleAddEvent} className="save-btn">
                  Save Event
                </button>
                <button 
                  onClick={() => setShowEventModal(false)}
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

export default Calendar;
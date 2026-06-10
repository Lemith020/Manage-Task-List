import { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [scheduleDate, setScheduleDate] = useState('');
  const [enableSchedule, setEnableSchedule] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const localDate = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const localTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    try {
      const taskData = {
        title,
        description,
        priority,
        createdDate: localDate,
        createdTime: localTime,
        timestamp: now.toISOString(),
        priorityRank: priority === 'High' ? 1 : priority === 'Medium' ? 2 : 3,
        scheduleDate: enableSchedule ? scheduleDate : null,
        isScheduled: enableSchedule
      };
      const response = await createTask(taskData);
      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setScheduleDate('');
      setEnableSchedule(false);
    } catch (err) {
      alert('Failed to create task');
    }
  };

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(124, 58, 237, 0.18)',
      marginBottom: '28px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 28px 12px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '22px' }}>📋</span>
        <div>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.15rem', fontWeight: '700', letterSpacing: '0.2px' }}>
            Task Manager
          </h2>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>
            Stay on top of everything that matters
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '20px 28px 24px 28px', color: '#fff' }}>
        <p style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Add New Task
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>

          {/* Title */}
          <div style={{ flex: '1', minWidth: '180px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What needs to be done?"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                outline: 'none',
                fontSize: '14px',
                height: '42px',
                boxSizing: 'border-box',
                transition: 'border 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
            />
          </div>

          {/* Description */}
          <div style={{ flex: '1.5', minWidth: '220px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                outline: 'none',
                fontSize: '14px',
                height: '42px',
                boxSizing: 'border-box',
                transition: 'border 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
            />
          </div>

          {/* Priority */}
          <div style={{ width: '145px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: '#fff',
                color: '#333',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                height: '42px',
                boxSizing: 'border-box',
                fontWeight: '500'
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Schedule toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <label style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              height: '42px'
            }}>
              <input
                type="checkbox"
                checked={enableSchedule}
                onChange={(e) => setEnableSchedule(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#fff' }}
              />
              Schedule
            </label>
          </div>

          {/* Schedule Date */}
          {enableSchedule && (
            <div style={{ width: '170px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
                Due Date
              </label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: '#fff',
                  color: '#333',
                  outline: 'none',
                  fontSize: '14px',
                  height: '42px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            style={{
              padding: '10px 22px',
              background: '#fff',
              color: '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              height: '42px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              boxSizing: 'border-box',
              transition: 'transform 0.15s, box-shadow 0.15s',
              letterSpacing: '0.2px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; }}
          >
            + Add Task
          </button>
        </div>
      </form>

      <style>{`
        input[placeholder]::placeholder {
          color: rgba(255,255,255,0.5) !important;
          font-weight: 600 !important;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default TaskForm;

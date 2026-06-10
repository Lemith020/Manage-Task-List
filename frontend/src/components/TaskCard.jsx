import { deleteTask, updateTask } from '../services/api';
import { FaTrash, FaCheckCircle, FaRegCircle, FaCalendarAlt } from 'react-icons/fa';

const TaskCard = ({ task, onTaskDeleted, onTaskUpdated }) => {

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const toggleComplete = async () => {
    try {
      const now = new Date();
      const completedDate = now.toLocaleDateString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
      });
      const completedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });

      const updates = {
        isCompleted: !task.isCompleted,
        completedDate: !task.isCompleted ? completedDate : null,
        completedTime: !task.isCompleted ? completedTime : null,
      };

      const response = await updateTask(task._id, updates);
      onTaskUpdated(response.data);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const priorityColor = task.priority === 'High' ? '#dc3545' : task.priority === 'Medium' ? '#f59e0b' : '#22c55e';


  const getDaysRemaining = () => {
    if (!task.scheduleDate) return null;

    const localToday = new Date();
    const todayYear = localToday.getFullYear();
    const todayMonth = String(localToday.getMonth() + 1).padStart(2, '0');
    const todayDay = String(localToday.getDate()).padStart(2, '0');
    const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;

    const d = new Date(task.scheduleDate);
    const scheduleYear = d.getUTCFullYear();
    const scheduleMonth = String(d.getUTCMonth() + 1).padStart(2, '0');
    const scheduleDay = String(d.getUTCDate()).padStart(2, '0');
    const scheduleStr = `${scheduleYear}-${scheduleMonth}-${scheduleDay}`;

    if (todayStr === scheduleStr) return 0;

    const date1 = new Date(todayStr);
    const date2 = new Date(scheduleStr);
    
    const diffTime = date2.getTime() - date1.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = getDaysRemaining();
  const isOverdue = days !== null && days < 0;
  const isDueToday = days === 0;
  const isDue1 = days === 1;
  const isDue2 = days === 2;
  const isDue3 = days === 3;
  const isWarning = (isOverdue || isDueToday || isDue1 || isDue2 || isDue3) && !task.isCompleted;

  const cardBg = () => {
    if (task.isCompleted) return '#f0fdf4';
    if (isWarning) return '#fff5f5'; 
    return '#ffffff';
  };

  const borderColor = () => {
    if (task.isCompleted) return '#4ade80';
    if (isOverdue || isDueToday) return '#dc3545';
    if (isDue1) return '#e8553e';
    if (isDue2) return '#f07850';
    if (isDue3) return '#f5a26a';
    return priorityColor;
  };

  const scheduleTextColor = () => {
    if (isOverdue || isDueToday) return '#dc3545';
    if (isDue1) return '#e8553e';
    if (isDue2) return '#f07850';
    if (isDue3) return '#f5a26a';
    return '#22c55e';
  };

  const deadlineBadge = () => {
    if (isOverdue) return `⚠️ Overdue ${Math.abs(days)}d`;
    if (isDueToday) return '🔴 Due Today!';
    if (isDue1) return '🔴 Due Tomorrow!';
    if (isDue2) return '🟠 2 days left';
    if (isDue3) return '🟡 3 days left';
    return null;
  };

  const badge = deadlineBadge();

  const formattedCreatedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '—';

  const formattedCreatedTime = task.createdAt
    ? new Date(task.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    : '—';

  const getBlinkClass = () => {
    if (!isWarning) return '';
    if (isOverdue || isDueToday) return 'blink-critical';
    if (isDue1) return 'blink-high';
    if (isDue2) return 'blink-medium';
    if (isDue3) return 'blink-low';
    return 'blink-critical';
  };

  console.log(`=== [${task.title}] DEBUG ===`);
  console.log("Schedule Date from DB:", task.scheduleDate);
  console.log("Calculated Days Left:", days);
  console.log("Is Warning Active?:", isWarning);
  console.log("==============================");

  return (
    <div
      className={getBlinkClass()}
      style={{
        background: cardBg(),
        padding: '14px 16px',
        borderRadius: '12px',
        boxShadow: isWarning
          ? `0 4px 16px ${scheduleTextColor()}40`
          : '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
        border: `1px solid ${isWarning ? scheduleTextColor() + '66' : task.isCompleted ? '#86efac' : '#f0f0f0'}`,
        borderLeftWidth: '5px',
        borderLeftColor: borderColor(),
        opacity: task.isCompleted ? 0.8 : 1,
        transition: 'all 0.3s ease',
      }}
    >

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap', marginBottom: '5px' }}>
          <h4 style={{
            margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e1b4b',
            textDecoration: task.isCompleted ? 'line-through' : 'none',
            wordBreak: 'break-word',
          }}>
            {task.title}
          </h4>
          <span style={{
            flexShrink: 0, fontSize: '10px', background: priorityColor,
            color: task.priority === 'Medium' ? '#333' : '#fff',
            padding: '2px 8px', borderRadius: '20px', fontWeight: '700',
          }}>
            {task.priority}
          </span>
          {badge && !task.isCompleted && (
            <span style={{
              flexShrink: 0, fontSize: '10px', background: scheduleTextColor(),
              color: '#fff', padding: '2px 8px', borderRadius: '20px', fontWeight: '700',
              animation: (isOverdue || isDueToday) ? 'pulse 0.8s infinite' : 'pulse 1.5s infinite',
            }}>
              {badge}
            </span>
          )}
        </div>

        {task.description ? (
          <p style={{
            margin: '0 0 8px 0', color: '#555', fontSize: '13px',
            lineHeight: '1.5', wordBreak: 'break-word',
            textDecoration: task.isCompleted ? 'line-through' : 'none',
          }}>
            {task.description}
          </p>
        ) : (
          <p style={{ margin: '0 0 8px 0', color: '#ccc', fontSize: '12px', fontStyle: 'italic' }}>
            No description
          </p>
        )}

        <div style={{
          display: 'flex', gap: '10px', alignItems: 'center',
          fontSize: '11px', color: '#888',
          borderTop: '1px solid #eee', paddingTop: '7px', flexWrap: 'wrap',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
            📅 <span style={{ color: '#666' }}>{formattedCreatedDate}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
            🕒 <span style={{ color: '#666' }}>{formattedCreatedTime}</span>
          </span>

          {task.scheduleDate && (
            <span
              className={isWarning ? 'schedule-date-blink' : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: '3px',
                color: scheduleTextColor(), fontWeight: isWarning ? '700' : '500', whiteSpace: 'nowrap',
              }}
            >
              <FaCalendarAlt style={{ fontSize: '10px' }} />
              <span>
                {(() => {
                  const d = new Date(task.scheduleDate);
                  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  });
                })()}
                {days !== null && days > 3 && (
                  <span style={{ color: '#aaa', fontWeight: '400' }}> ({days}d left)</span>
                )}
              </span>
            </span>
          )}
          {task.isCompleted && task.completedDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#22c55e', fontWeight: '600', whiteSpace: 'nowrap' }}>
              ✅ <span>{task.completedDate} {task.completedTime || ''}</span>
            </span>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        fontSize: '17px', alignItems: 'center',
        paddingLeft: '12px', paddingTop: '2px', flexShrink: 0,
      }}>
        <span
          onClick={toggleComplete}
          title={task.isCompleted ? 'Mark incomplete' : 'Mark complete'}
          style={{ color: task.isCompleted ? '#22c55e' : '#ccc', cursor: 'pointer', transition: 'transform 0.2s, color 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; e.currentTarget.style.color = '#22c55e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = task.isCompleted ? '#22c55e' : '#ccc'; }}
        >
          {task.isCompleted ? <FaCheckCircle /> : <FaRegCircle />}
        </span>
        <span
          onClick={handleDelete}
          title="Delete task"
          style={{ color: '#dc3545', cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaTrash />
        </span>
      </div>

      <style>{`
        .blink-critical {
          animation: blink-critical 0.8s ease-in-out infinite !important;
        }
        
        @keyframes blink-critical {
          0%, 100% {
            background-color: #fff0f0 !important;
            box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
          }
          50% {
            background-color: #ffe0e0 !important;
            box-shadow: 0 4px 20px rgba(220, 53, 69, 0.35);
            border-color: #ff6b6b !important;
          }
        }
        
        .blink-high {
          animation: blink-high 1.2s ease-in-out infinite !important;
        }
        
        @keyframes blink-high {
          0%, 100% { background-color: #fff5f0 !important; }
          50% { background-color: #ffe8e0 !important; box-shadow: 0 2px 12px rgba(232, 85, 62, 0.2); }
        }
        
        .blink-medium {
          animation: blink-medium 1.8s ease-in-out infinite !important;
        }
        
        @keyframes blink-medium {
          0%, 100% { background-color: #fffaf5 !important; }
          50% { background-color: #fff0e6 !important; }
        }
        
        .blink-low {
          animation: blink-low 2.5s ease-in-out infinite !important;
        }
        
        @keyframes blink-low {
          0%, 100% { background-color: #fffff5 !important; }
          50% { background-color: #fffae6 !important; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        
        .schedule-date-blink {
          animation: text-blink 1s ease-in-out infinite;
        }
        
        @keyframes text-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        div[style*="borderLeftWidth"]:hover {
          transform: translateX(3px);
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
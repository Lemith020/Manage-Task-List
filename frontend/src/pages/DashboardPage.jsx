import { useEffect, useState, useContext } from 'react';
import { getTasks } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortByPriority = (arr) =>
    [...arr].sort((a, b) => {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(sortByPriority(response.data));
      } catch (err) {
        alert('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => sortByPriority([newTask, ...prev]));
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      sortByPriority(
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      )
    );
  };

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const pendingTasks = tasks.filter((t) => !t.isCompleted);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(135deg, #f0f0ff 0%, #f8f4ff 50%, #fff0f8 100%)',
        overflow: 'hidden',
      }}
    >
      <Navbar />

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: '10px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>
            {user?.name ? `Hey, ${user.name} 👋` : 'My Tasks'}
          </h1>
          <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* STATS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <div style={{ background: '#fef9c3', padding: '12px', borderRadius: 10 }}>
            Total Tasks: {tasks.length}
          </div>
          <div style={{ background: '#dcfce7', padding: '12px', borderRadius: 10 }}>
            Done: {completedTasks.length}
          </div>
        </div>

        {/* FORM */}
        <div style={{ marginBottom: '10px' }}>
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        {/* TASK GRID */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            overflow: 'hidden',
          }}
          className="task-grid"
        >
          {/* PENDING */}
          <div
            style={{
              overflowY: 'auto',
              paddingRight: '5px',
              maxHeight: '100%',
            }}
          >
            {/* Sticky Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                background: '#fff',
                zIndex: 2,
                padding: '8px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <h3 style={{ margin: 0, color: '#3b0764' }}>
                Pending ({pendingTasks.length})
              </h3>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : pendingTasks.length === 0 ? (
              <p>No pending tasks</p>
            ) : (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskDeleted={handleTaskDeleted}
                  onTaskUpdated={handleTaskUpdated}
                />
              ))
            )}
          </div>

          {/* DONE */}
          <div
            style={{
              overflowY: 'auto',
              paddingRight: '5px',
              maxHeight: '100%',
            }}
          >
            {/* Sticky Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                background: '#fff',
                zIndex: 2,
                padding: '8px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <h3 style={{ margin: 0, color: '#166534' }}>
                Done ({completedTasks.length})
              </h3>
            </div>

            {completedTasks.length === 0 ? (
              <p>No completed tasks</p>
            ) : (
              completedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskDeleted={handleTaskDeleted}
                  onTaskUpdated={handleTaskUpdated}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE */}
      <style>{`
        @media (max-width: 640px) {
          .task-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
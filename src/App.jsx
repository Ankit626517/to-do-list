import { useState } from 'react';

function App() {
  // State for the task input and task list
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add a new task
  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  };

  // Delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // show all
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-850 to-blue-950 flex items-start justify-center p-4 pt-10">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">🌟 My To-Do List</h1>
  
        {/* Add Task Section */}
        <div className="flex mb-4">
          <input
            type="text"
            className="bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition shadow-md"
            onClick={addTask}
          >
            Add
          </button>
        </div>
  
        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-4">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full font-medium transition ${
                filter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
  
        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.length === 0 ? (
            <p className="text-center py-4 text-white/80">
              {filter === 'all'
                ? "No tasks yet. Add one above!"
                : filter === 'active'
                ? "No active tasks!"
                : "No completed tasks!"}
            </p>
          ) : (
            filteredTasks.map((t, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition duration-300 ${
                  t.completed
                    ? 'bg-green-100/30 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-3 h-5 w-5 accent-blue-500"
                  />
                  <span className={`${t.completed ? 'line-through text-white/60' : ''}`}>
                    {t.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
  
        {/* Task Count */}
        {tasks.length > 0 && (
          <p className="mt-4 text-sm text-white/70 text-center">
            {tasks.filter(t => !t.completed).length} active, {tasks.filter(t => t.completed).length} completed
          </p>
        )}
      </div>
    </div>
  );
  
}

export default App;
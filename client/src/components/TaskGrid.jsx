import { FaTasks } from "react-icons/fa";
import TaskCard from "./TaskCard";

const TaskGrid = ({ tasks, loading, search, filter, onEdit, onDelete, onToggle }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 h-40 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-full mb-2" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <FaTasks className="text-5xl mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">
          {search || filter !== "all"
            ? "No tasks match your search."
            : "No tasks yet."}
        </p>
        {!search && filter === "all" && (
          <p className="text-sm mt-1">Click "Add Task" to get started!</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskGrid;
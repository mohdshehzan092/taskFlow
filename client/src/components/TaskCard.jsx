import { FaEdit, FaTrash, FaCheck, FaClock } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const isCompleted = task.status === "completed";

  const date = new Date(task.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3 ${
        isCompleted ? "opacity-75" : ""
      }`}
    >
      {/* Title + Status Badge */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-semibold text-gray-800 text-base leading-snug ${
            isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="text-xs text-gray-400">{date}</span>
        <div className="flex items-center gap-1">
          {/* Toggle */}
          <button
            onClick={() => onToggle(task)}
            title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
            className={`p-2 rounded-lg text-sm transition-colors ${
              isCompleted
                ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                : "bg-green-50 text-green-500 hover:bg-green-100"
            }`}
          >
            {isCompleted ? <FaClock /> : <FaCheck />}
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 text-sm transition-colors"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task)}
            className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 text-sm transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
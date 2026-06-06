import { useState, useEffect } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsBar from "../components/StatsBar";
import SearchFilter from "../components/SearchFilter";
import TaskGrid from "../components/TaskGrid";
import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Fetch Tasks ──
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks/get-tasks");
      setTasks(data.tasks || data || []);
    } catch (err) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ── Toggle Status ──
  const handleToggle = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      await API.put(`/tasks/update-task/${task._id}`, { ...task, status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
    } catch {
      alert("Failed to update status.");
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/tasks/delete-task/${deleteTask._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== deleteTask._id));
      setDeleteTask(null);
    } catch {
      alert("Failed to delete task.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Save (Create / Edit) ──
  const handleSave = (savedTask) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t._id === savedTask._id ? savedTask : t))
      );
    } else {
      setTasks((prev) => [savedTask, ...prev]);
    }
    setEditTask(null);
  };

  // ── Filtered Tasks ──
  const filteredTasks = tasks.filter((t) => {
    const matchFilter = filter === "all" || t.status === filter;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Stats */}
        <StatsBar tasks={tasks} />

        {/* Search + Filter + Add */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onAddTask={() => {
            setEditTask(null);
            setShowModal(true);
          }}
        />

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Task Grid */}
        <TaskGrid
          tasks={filteredTasks}
          loading={loading}
          search={search}
          filter={filter}
          onEdit={(task) => {
            setEditTask(task);
            setShowModal(true);
          }}
          onDelete={(task) => setDeleteTask(task)}
          onToggle={handleToggle}
        />
      </div>

      {/* Task Modal (Add / Edit) */}
      {showModal && (
        <TaskModal
          task={editTask}
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteTask && (
        <DeleteModal
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      )}
       <Footer /> 
    </div>
  );
};

export default Dashboard;
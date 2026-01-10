import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { taskAPI } from "../services/api";
import {
  CheckSquare,
  Users,
  Clock,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

const Dashboard = () => {
  const { user } = useAuth();

  // Consolidated state using useReducer pattern with useState
  const [state, setState] = useState({
    tasks: [],
    loading: true,
    searchQuery: "",
    statusFilter: "",
    showModal: false,
    editingTask: null,
    formData: INITIAL_FORM_STATE,
  });

  const {
    tasks,
    loading,
    searchQuery,
    statusFilter,
    showModal,
    editingTask,
    formData,
  } = state;

  // Update specific state properties
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateFormData = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
    }));
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (statusFilter) params.status = statusFilter;
      const response = await taskAPI.getTasks(params);
      updateState({ tasks: response.data.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch tasks");
      updateState({ loading: false });
    }
  }, [searchQuery, statusFilter, updateState]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, formData);
        toast.success("Task updated");
      } else {
        await taskAPI.createTask(formData);
        toast.success("Task created");
      }
      updateState({
        showModal: false,
        editingTask: null,
        formData: INITIAL_FORM_STATE,
      });
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await taskAPI.deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = useCallback(
    (task) => {
      updateState({
        editingTask: task,
        formData: {
          title: task.title,
          description: task.description || "",
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        },
        showModal: true,
      });
    },
    [updateState]
  );

  const openNewTask = useCallback(() => {
    updateState({
      editingTask: null,
      formData: INITIAL_FORM_STATE,
      showModal: true,
    });
  }, [updateState]);

  // Memoized computed values
  const stats = useMemo(
    () => [
      {
        label: "Total Tasks",
        value: tasks.length.toString(),
        change: "+12%",
        icon: CheckSquare,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
      },
      {
        label: "Active Users",
        value: "1,429",
        change: "+8.2%",
        icon: Users,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        label: "Pending Tasks",
        value: tasks.filter((t) => t.status === "pending").length.toString(),
        change: "-4.5%",
        changeNegative: true,
        icon: Clock,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        label: "Completion Rate",
        value:
          tasks.length > 0
            ? Math.round(
                (tasks.filter((t) => t.status === "completed").length /
                  tasks.length) *
                  100
              ) + "%"
            : "0%",
        change: "+3.1%",
        icon: TrendingUp,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
    ],
    [tasks]
  );

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
  };

  const priorityStyles = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-violet-100 text-violet-700",
    high: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeNegative ? "text-rose-500" : "text-emerald-500"
                }`}
              >
                {stat.changeNegative ? "↓" : "↗"} {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <p className="text-sm text-gray-500">
                Manage and track your team's tasks
              </p>
            </div>
            <button
              onClick={openNewTask}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateState({ searchQuery: e.target.value })}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => updateState({ statusFilter: e.target.value })}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="text-gray-400">
                      <CheckSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No tasks found. Create your first task!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.status === "completed"
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-gray-300"
                          }`}
                        >
                          {task.status === "completed" && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <span
                          className={`font-medium ${
                            task.status === "completed"
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                          statusStyles[task.status]
                        }`}
                      >
                        {task.status === "in-progress"
                          ? "In Progress"
                          : task.status}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-gray-600 text-sm">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "-"}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xs font-medium">
                          {user?.name?.charAt(0)}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {user?.name?.split(" ")[0]}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
                  placeholder="Task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateFormData("status", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateFormData("priority", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => updateFormData("dueDate", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => updateState({ showModal: false })}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-teal-600 transition"
                >
                  {editingTask ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

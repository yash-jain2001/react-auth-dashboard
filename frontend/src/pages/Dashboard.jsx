import { useAuth } from "../context/AuthContext";
import {
  CheckSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Tasks",
      value: "0",
      icon: CheckSquare,
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "In Progress",
      value: "0",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: "0",
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "High Priority",
      value: "0",
      icon: AlertCircle,
      color: "from-rose-500 to-red-500",
      bg: "bg-rose-500/10",
    },
  ];

  const quickActions = [
    { icon: Target, label: "Create Task", desc: "Add a new task" },
    { icon: Calendar, label: "View Calendar", desc: "Check deadlines" },
    { icon: TrendingUp, label: "Analytics", desc: "Coming soon" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-violet-500/25">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {user?.name?.split(" ")[0]}
              </span>
              !
            </h1>
            <p className="text-gray-400 mt-1">
              Here's an overview of your productivity
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
            ></div>
            <div className="relative">
              <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {quickActions.map((action, i) => (
          <button
            key={i}
            className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 text-left hover:shadow-lg hover:shadow-violet-500/10"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all">
                <action.icon className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-white font-semibold">{action.label}</p>
                <p className="text-gray-500 text-sm">{action.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Tasks</h2>
          <button className="text-sm text-violet-400 hover:text-violet-300 font-medium transition">
            View all
          </button>
        </div>
        <div className="p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-slate-700/30 mb-4">
            <CheckSquare className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No tasks yet</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            Get started by creating your first task to track your progress and
            boost productivity.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all">
            Create your first task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

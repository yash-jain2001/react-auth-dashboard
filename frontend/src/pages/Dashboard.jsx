import { useAuth } from "../context/AuthContext";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const kpis = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Users",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Orders",
      value: "1,247",
      change: "-4.5%",
      trend: "down",
      icon: ShoppingCart,
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      customer: "John Smith",
      email: "john@email.com",
      amount: "$250.00",
      status: "Completed",
      date: "2026-01-10",
    },
    {
      id: "TXN002",
      customer: "Sarah Wilson",
      email: "sarah@email.com",
      amount: "$120.50",
      status: "Pending",
      date: "2026-01-10",
    },
    {
      id: "TXN003",
      customer: "Mike Johnson",
      email: "mike@email.com",
      amount: "$340.00",
      status: "Completed",
      date: "2026-01-09",
    },
    {
      id: "TXN004",
      customer: "Emily Brown",
      email: "emily@email.com",
      amount: "$89.99",
      status: "Failed",
      date: "2026-01-09",
    },
    {
      id: "TXN005",
      customer: "David Lee",
      email: "david@email.com",
      amount: "$520.00",
      status: "Completed",
      date: "2026-01-08",
    },
  ];

  const topProducts = [
    { name: "Premium Plan", sales: 1234, revenue: "$12,340", growth: "+12%" },
    { name: "Basic Plan", sales: 890, revenue: "$4,450", growth: "+8%" },
    { name: "Enterprise", sales: 456, revenue: "$22,800", growth: "+23%" },
    { name: "Starter Pack", sales: 234, revenue: "$1,170", growth: "-3%" },
  ];

  const statusColors = {
    Completed: "bg-emerald-500/20 text-emerald-400",
    Pending: "bg-amber-500/20 text-amber-400",
    Failed: "bg-rose-500/20 text-rose-400",
  };

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
              Here's what's happening with your business today
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${kpi.color} opacity-0 group-hover:opacity-5 transition-opacity`}
            ></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex p-3 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.trend === "up" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{kpi.value}</p>
              <p className="text-gray-400 text-sm font-medium">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Transactions
            </h2>
            <button className="text-sm text-violet-400 hover:text-violet-300 font-medium transition">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                    Transaction
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition"
                  >
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">{txn.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white text-sm">{txn.customer}</p>
                        <p className="text-gray-500 text-xs">{txn.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">
                        {txn.amount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          statusColors[txn.status]
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-400 text-sm">{txn.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
          </div>
          <div className="p-4 space-y-4">
            {topProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {product.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium text-sm">
                    {product.revenue}
                  </p>
                  <p
                    className={`text-xs ${
                      product.growth.startsWith("+")
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Weekly Sales</h3>
            <span className="text-emerald-400 text-sm font-medium">+12.5%</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-violet-600 to-fuchsia-600 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-white font-medium mb-4">Traffic Source</h3>
          <div className="space-y-4">
            {[
              { source: "Direct", value: "45%", color: "bg-violet-500" },
              { source: "Organic", value: "30%", color: "bg-blue-500" },
              { source: "Referral", value: "15%", color: "bg-emerald-500" },
              { source: "Social", value: "10%", color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.source}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-white font-medium mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <span className="text-gray-400">Avg. Order Value</span>
              <span className="text-white font-semibold">$156.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <span className="text-gray-400">Return Rate</span>
              <span className="text-white font-semibold">2.4%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <span className="text-gray-400">Customer LTV</span>
              <span className="text-white font-semibold">$892.00</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-400">Churn Rate</span>
              <span className="text-white font-semibold">1.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

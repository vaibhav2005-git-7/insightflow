"use client";

import { useState } from "react";
import { monthlyRevenue, categoryData, topProducts, kpiData } from "@/lib/data";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, ShoppingCart, DollarSign, Users, Star,
} from "lucide-react";

export default function Dashboard() {
  const [activeChart, setActiveChart] = useState<"revenue" | "orders">("revenue");

  return (
    <main className="min-h-screen bg-[#0f0f13] text-white font-sans p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          InsightFlow
        </h1>
        <p className="text-gray-400 mt-1">E-Commerce Analytics Dashboard · 2024</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Total Revenue" value="$868,000" growth={kpiData.revenueGrowth} icon={<DollarSign size={20} />} />
        <KPICard title="Total Orders" value="6,453" growth={kpiData.ordersGrowth} icon={<ShoppingCart size={20} />} />
        <KPICard title="Avg Order Value" value="$134.5" growth={kpiData.aovGrowth} icon={<Users size={20} />} />
        <KPICard title="Satisfaction" value="94.2%" growth={kpiData.satisfactionGrowth} icon={<Star size={20} />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Line/Bar Chart */}
        <div className="md:col-span-2 bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Performance Over Time</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveChart("revenue")}
                className={`px-3 py-1 rounded-full text-sm ${activeChart === "revenue" ? "bg-indigo-600" : "bg-white/10"}`}
              >Revenue</button>
              <button
                onClick={() => setActiveChart("orders")}
                className={`px-3 py-1 rounded-full text-sm ${activeChart === "orders" ? "bg-indigo-600" : "bg-white/10"}`}
              >Orders</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            {activeChart === "revenue" ? (
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #ffffff20" }} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            ) : (
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #ffffff20" }} />
                <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #ffffff20" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {categoryData.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
        <h2 className="text-lg font-semibold mb-4">Top Products</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-white/5">
              <th className="text-left pb-3">Product</th>
              <th className="text-right pb-3">Sales</th>
              <th className="text-right pb-3">Revenue</th>
              <th className="text-right pb-3">Growth</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 font-medium">{p.name}</td>
                <td className="py-3 text-right text-gray-300">{p.sales.toLocaleString()}</td>
                <td className="py-3 text-right text-gray-300">${p.revenue.toLocaleString()}</td>
                <td className="py-3 text-right">
                  <span className={`flex items-center justify-end gap-1 ${p.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {p.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(p.growth)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}

function KPICard({ title, value, growth, icon }: { title: string; value: string; growth: number; icon: React.ReactNode }) {
  const isPositive = growth >= 0;
  return (
    <div className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-indigo-400">{icon}</span>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {Math.abs(growth)}% vs last year
      </div>
    </div>
  );
}
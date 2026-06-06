const StatsBar = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const stats = [
    { label: "Total Tasks", value: total, color: "bg-indigo-50 text-indigo-700" },
    { label: "Pending", value: pending, color: "bg-amber-50 text-amber-700" },
    { label: "Completed", value: completed, color: "bg-green-50 text-green-700" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.color} rounded-2xl p-4 text-center`}>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs font-medium mt-1 opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
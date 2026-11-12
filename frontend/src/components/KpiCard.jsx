const KpiCard = ({
  title,
  value,
  compact = false,
  loading = false,
  error = null,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="rounded-lg border p-4 animate-pulse border-slate-700 bg-slate-800">
        <div className="h-4 w-24 bg-slate-700 rounded mb-4" />
        <div className="h-8 w-32 bg-slate-700 rounded mb-3" />
        <div className="h-3 w-20 bg-slate-700 rounded" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border p-4 border-red-900 bg-slate-800">
        <h3 className="text-sm text-slate-400">{title}</h3>
        <p className="mt-3 text-sm text-red-400">Unable to load data</p>
      </div>
    );
  }

  // Normal state
  return (
    <div className="min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>

      <p
        className={`mt-2 font-bold text-white ${
          compact ? "text-xl" : "text-3xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
};
export default KpiCard;

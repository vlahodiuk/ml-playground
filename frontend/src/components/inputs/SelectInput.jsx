const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300
          bg-white px-4 py-3 text-slate-900 outline-none transition-colors
          hover:border-slate-400
          focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
          dark:border-slate-600 dark:bg-slate-800 dark:text-white
          dark:hover:border-slate-400
          dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

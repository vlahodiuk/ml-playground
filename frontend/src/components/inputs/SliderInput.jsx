const SliderInput = ({
  label,
  name,
  value,
  onChange,
  min = 0,
  max = 0.5,
  step = 0.01,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-sm font-medium text-slate-400">
          {label}
        </label>

        <span className="text-sm font-medium text-cyan-400">
          {value.toFixed(2)}
        </span>
      </div>

      <input
        id={name}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full cursor-pointer accent-cyan-400"
      />

      <div className="flex justify-between text-xs text-slate-500">
        <span>{min.toFixed(2)}</span>
        <span>{max.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SliderInput;

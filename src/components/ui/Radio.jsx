// Radio - accessible radio field.
export default function Radio({ label, checked, defaultChecked, onChange, disabled = false, ...props }) {
  return (
    <label className="mkt-choice">
      <input type="radio" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...props} />
      <span>{label}</span>
    </label>
  );
}

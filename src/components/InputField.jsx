
function InputField({ label, type, value, placeholder, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input 
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
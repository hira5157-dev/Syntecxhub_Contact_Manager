import { useEffect, useState } from "react";
import { MailIcon, PhoneIcon, PinIcon, PlusIcon, UserIcon, CheckIcon } from "./Icons.jsx";

const empty = { name: "", phone: "", email: "", address: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!/^[+]?[0-9\s-]{7,15}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number (7-15 digits)";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid email address";
  return errors;
}

export default function ContactForm({ editing, onSubmit, onCancel, saving }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(editing ? { ...empty, ...editing } : empty);
    setErrors({});
  }, [editing]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    const ok = await onSubmit(values);
    if (ok && !editing) setValues(empty);
  };

  const field = (name, label, Icon, placeholder, type = "text") => (
    <label className={`field ${errors[name] ? "has-error" : ""}`}>
      <span className="field-label">{label}</span>
      <span className="input-wrap">
        <Icon className="input-icon" />
        <input
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </span>
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </label>
  );

  return (
    <form className={`panel form ${editing ? "is-editing" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <span className="form-badge">{editing ? <CheckIcon /> : <PlusIcon />}</span>
        <div>
          <h2>{editing ? "Edit contact" : "New contact"}</h2>
          <p>{editing ? "Update the details below" : "Add someone to your list"}</p>
        </div>
      </div>

      {field("name", "Full name", UserIcon, "e.g. Ali Khan")}
      {field("phone", "Phone number", PhoneIcon, "e.g. 0300 1234567")}
      {field("email", "Email address", MailIcon, "e.g. ali@example.com", "email")}
      {field("address", "Address (optional)", PinIcon, "e.g. Lahore")}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : editing ? "Save changes" : "Add contact"}
        </button>
        {editing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

import { EditIcon, MailIcon, PhoneIcon, PinIcon, TrashIcon } from "./Icons.jsx";

// Same name always gets the same avatar colour
function colorIndex(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % 6;
}

function initials(name) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

export default function ContactList({ contacts, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card skeleton" />
        ))}
      </div>
    );
  }

  if (!contacts.length) {
    return (
      <div className="empty">
        <div className="empty-art">
          <PhoneIcon width={34} height={34} />
        </div>
        <h3>No contacts yet</h3>
        <p>Add your first contact using the form, or try a different search.</p>
      </div>
    );
  }

  return (
    <ul className="grid">
      {contacts.map((c, i) => (
        <li key={c._id} className="card" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
          <div className="card-top">
            <div className={`avatar av-${colorIndex(c.name)}`}>{initials(c.name)}</div>
            <div className="card-title">
              <h3>{c.name}</h3>
              <span>Contact</span>
            </div>
          </div>

          <ul className="details">
            <li>
              <PhoneIcon /> <span>{c.phone}</span>
            </li>
            <li>
              <MailIcon /> <span>{c.email}</span>
            </li>
            {c.address && (
              <li>
                <PinIcon /> <span>{c.address}</span>
              </li>
            )}
          </ul>

          <div className="card-actions">
            <button className="btn btn-soft" onClick={() => onEdit(c)}>
              <EditIcon /> Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(c)}>
              <TrashIcon /> Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

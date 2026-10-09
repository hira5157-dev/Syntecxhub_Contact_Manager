import { useCallback, useEffect, useState } from "react";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import { AlertIcon, CheckIcon, SearchIcon, TrashIcon } from "./components/Icons.jsx";
import { createContact, deleteContact, getContacts, updateContact } from "./api.js";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }

  const flash = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setContacts(await getContacts(search));
    } catch (err) {
      flash("error", err.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounced search / initial load
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const handleSubmit = async (values) => {
    try {
      setSaving(true);
      if (editing) {
        await updateContact(editing._id, values);
        flash("success", "Contact updated");
        setEditing(null);
      } else {
        await createContact(values);
        flash("success", "Contact added");
      }
      await load();
      return true;
    } catch (err) {
      flash("error", err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    const contact = deleteTarget;
    setDeleteTarget(null);
    try {
      await deleteContact(contact._id);
      flash("success", "Contact deleted");
      if (editing && editing._id === contact._id) setEditing(null);
      await load();
    } catch (err) {
      flash("error", err.message);
    }
  };

  const withAddress = contacts.filter((c) => c.address).length;

  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <span className="hero-badge">Syntecxhub Internship Project</span>
          <h1>
            Contact <em>Manager</em>
          </h1>
          <p>Keep everyone who matters organised in one beautiful place.</p>
          <div className="stats">
            <div className="stat">
              <b>{contacts.length}</b>
              <span>{search ? "Matching" : "Total"} contacts</span>
            </div>
            <div className="stat">
              <b>{withAddress}</b>
              <span>With address</span>
            </div>
          </div>
        </header>

        {message && (
          <div className={`toast ${message.type}`}>
            {message.type === "success" ? <CheckIcon /> : <AlertIcon />}
            {message.text}
          </div>
        )}

        <main className="layout">
          <ContactForm
            editing={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            saving={saving}
          />

          <section>
            <div className="search-wrap">
              <SearchIcon className="search-icon" />
              <input
                className="search"
                type="search"
                placeholder="Search by name, phone or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <ContactList
              contacts={contacts}
              loading={loading}
              onEdit={(c) => {
                setEditing(c);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={setDeleteTarget}
            />
          </section>
        </main>

        <footer className="footer">Built with React, Express &amp; MongoDB</footer>
      </div>

      {deleteTarget && (
        <div className="modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <TrashIcon width={26} height={26} />
            </div>
            <h3>Delete this contact?</h3>
            <p>
              <strong>{deleteTarget.name}</strong> will be removed permanently. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>
                Keep it
              </button>
              <button className="btn btn-danger-solid" onClick={confirmDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const BASE = "/api/contacts";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const getContacts = (search = "") =>
  request(`${BASE}?search=${encodeURIComponent(search)}`);

export const createContact = (contact) =>
  request(BASE, { method: "POST", body: JSON.stringify(contact) });

export const updateContact = (id, contact) =>
  request(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(contact) });

export const deleteContact = (id) =>
  request(`${BASE}/${id}`, { method: "DELETE" });

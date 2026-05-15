import { useState, useEffect } from "react";

const API = "http://localhost:8000/api/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "", description: "", location: "", status: "lost", reportedBy: "", contactEmail: ""
  });

  const fetchItems = async () => {
    const res = await fetch(`${API}/all`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async () => {
    await fetch(`${API}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchItems();
    setForm({ itemName: "", description: "", location: "", status: "lost", reportedBy: "", contactEmail: "" });
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleClaim = async (id) => {
    await fetch(`${API}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "claimed" }),
    });
    fetchItems();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Campus Lost & Found</h1>

      <div style={{ background: "#f5f5f5", padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <h2>Report an Item</h2>
        {["itemName","description","location","reportedBy","contactEmail"].map(field => (
          <input key={field} placeholder={field} value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: 8, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
          />
        ))}
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
          style={{ width: "100%", padding: "8px 10px", marginBottom: 8, borderRadius: 4, border: "1px solid #ccc" }}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <button onClick={handleSubmit} style={{ background: "#1D9E75", color: "#fff", padding: "10px 20px", borderRadius: 4, border: "none", cursor: "pointer" }}>
          Submit Report
        </button>
      </div>

      <h2>All Reported Items</h2>
      {items.map(item => (
        <div key={item._id} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: 14, marginBottom: 12 }}>
          <strong>{item.itemName}</strong> — <span style={{ color: item.status === "claimed" ? "green" : item.status === "found" ? "blue" : "red" }}>{item.status}</span>
          <p style={{ margin: "4px 0", color: "#555" }}>{item.description}</p>
          <p style={{ margin: "4px 0", fontSize: 13, color: "#777" }}>📍 {item.location} | Reported by: {item.reportedBy}</p>
          <div style={{ marginTop: 8 }}>
            {item.status !== "claimed" && (
              <button onClick={() => handleClaim(item._id)} style={{ marginRight: 8, padding: "6px 14px", background: "#1D9E75", color: "#fff", borderRadius: 4, border: "none", cursor: "pointer" }}>
                Mark Claimed
              </button>
            )}
            <button onClick={() => handleDelete(item._id)} style={{ padding: "6px 14px", background: "#E24B4A", color: "#fff", borderRadius: 4, border: "none", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
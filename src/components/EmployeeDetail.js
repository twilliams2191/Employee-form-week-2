import React from "react";
import { useParams, Link } from "react-router-dom";

export default function EmployeeDetail({ employees }) {
  const { id } = useParams();
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <main style={{ padding: "1rem" }}>
        <h1>Employee Detail</h1>
        <p>Employee not found.</p>
        <Link to="/employees">← Back to Employee List</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Employee Detail</h1>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          maxWidth: 480,
          background: "#fff",
        }}
      >
        <Row label="Full Name" value={employee.name} />
        <Row label="Email" value={employee.email} />
        <Row label="Job Title" value={employee.title} />
        <Row label="Department" value={employee.department} />
        <Row label="Created" value={new Date(employee.createdAt).toLocaleString()} />
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/employees">← Back to Employee List</Link>
      </div>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeList({ employees }) {
  if (!employees || employees.length === 0) {
    return <p>No employees saved yet.</p>;
  }

  return (
    <section style={{ marginTop: "1rem" }}>
      <h2>Employee List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {employees.map((e) => (
          <li key={e.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>
            <Link to={`/employees/${e.id}`} style={{ textDecoration: "none", fontWeight: 600 }}>
              {e.name}
            </Link>
            <div style={{ fontSize: "14px", color: "#555" }}>
              {e.title} • {e.department} • {e.email}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

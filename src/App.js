import React, { useEffect, useState, useMemo, useCallback } from "react";
import EmployeeForm from "./components/EmployeeForm";

const STORAGE_KEY = "ems.employees";

function App() {
  // Load from localStorage
  const [employees, setEmployees] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever employees change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
      // ignore write errors for this assignment
    }
  }, [employees]);

  // Callback passed to EmployeeForm
  const handleCreate = useCallback((employee) => {
    setEmployees((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...employee, createdAt: new Date().toISOString() },
    ]);
  }, []);

  // derived value example for the paper’s hooks section
  const count = useMemo(() => employees.length, [employees]);

  const handleClear = () => {
    setEmployees([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Employee Data in Local Storage</h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <EmployeeForm onCreate={handleCreate} />
      </section>

      <section aria-labelledby="tableHeading">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 id="tableHeading" style={{ margin: "0.5rem 0" }}>
            Saved Employees ({count})
          </h2>
          <button onClick={handleClear}>Clear Storage</button>
        </div>

        {employees.length === 0 ? (
          <p>No employees saved yet. Add one with the form above.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            >
              <thead>
                <tr>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Title</th>
                  <th style={th}>Department</th>
                  <th style={th}>Created</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td style={td}>{e.name}</td>
                    <td style={td}>{e.email}</td>
                    <td style={td}>{e.title}</td>
                    <td style={td}>{e.department}</td>
                    <td style={td}>{new Date(e.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const th = { textAlign: "left", padding: "8px", borderBottom: "1px solid #eee" };
const td = { padding: "8px", borderBottom: "1px solid #f1f1f1" };

export default App;


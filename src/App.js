import React, { useEffect, useState, useMemo, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetail from "./components/EmployeeDetail";

const STORAGE_KEY = "ems.employees";

function App() {
  // Load employees from localStorage
  const [employees, setEmployees] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Save employees to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
      // ignore errors for this assignment
    }
  }, [employees]);

  // Add a new employee from the form
  const handleCreate = useCallback((employee) => {
    setEmployees((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...employee, createdAt: new Date().toISOString() },
    ]);
  }, []);

  // Count employees for display
  const count = useMemo(() => employees.length, [employees]);

  // Clear all saved employees
  const handleClear = () => {
    setEmployees([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BrowserRouter>
      <main style={{ padding: "1rem", maxWidth: 960, margin: "0 auto" }}>
        <nav style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/employees">Employee List</Link>
        </nav>

        <Routes>
          {/* Home: form + saved list + band video */}
          <Route
            path="/"
            element={
              <>
                <h1>Employee Data in Local Storage</h1>

                <section style={{ marginBottom: "1.25rem" }}>
                  <EmployeeForm onCreate={handleCreate} />
                </section>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 style={{ margin: 0 }}>Saved Employees ({count})</h2>
                  <button onClick={handleClear}>Clear Storage</button>
                </div>

                <EmployeeList employees={employees} />

                {/* Latest band video section */}
                <section style={{ marginTop: "2rem" }}>
                  <h2>Latest Band Video</h2>
                  <p style={{ marginTop: 4, marginBottom: 12 }}>
                    Watch the latest video from our band directly in the app.
                  </p>

                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%", // 16:9 aspect ratio
                      height: 0,
                      overflow: "hidden",
                      borderRadius: 12,
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/VYBQtFQAi98?si=mAipFwwU-IVytsog"
                      title="Latest Band Video"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </section>
              </>
            }
          />

          {/* Employee list page */}
          <Route path="/employees" element={<EmployeeList employees={employees} />} />

          {/* Employee detail page */}
          <Route path="/employees/:id" element={<EmployeeDetail employees={employees} />} />

          {/* Redirect any unknown path back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

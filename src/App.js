import React from "react";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  // Optional: this receives the new employee data from the form
  const handleCreate = (employee) => {
    console.log("Created via App:", employee);
  };

  return (
    <main style={{ padding: "1rem" }}>
      <EmployeeForm onCreate={handleCreate} />
    </main>
  );
}

export default App;

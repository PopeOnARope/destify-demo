import React from "react";
import "./App.css";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./features/layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}

export default App;

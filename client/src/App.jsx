import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

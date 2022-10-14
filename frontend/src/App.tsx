import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

import Create from "./Components/Create";
import Edit from "./Components/Edit";
import List from "./Components/List";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/list" element={<List />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

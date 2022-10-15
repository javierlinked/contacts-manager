import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

import Create from "./Components/Create";
import Edit from "./Components/Edit";
import List from "./Components/List";
import Login from "./Components/Login";

function App() {
  const divStyle: React.CSSProperties = {
    width: "90%",
    alignContent: "left",
  };

  return (
    <div className="App" style={divStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/list" element={<List />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

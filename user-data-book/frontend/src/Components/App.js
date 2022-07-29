import { Home, Landing, Login, Signup, TableView, CreateTable } from "./";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
function App() {
  return (
    <>
      <Routes>
        <Route exact="true" path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Header><Home /></Header>} />
        <Route path="/table/:tablename" element={<Header><TableView /></Header>} />
        <Route path="/create-table" element={<Header><CreateTable /></Header>} />
      </Routes>
    </>
  );
}

export default App;

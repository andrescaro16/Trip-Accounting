import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login/Login";

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<h1>Home</h1>} />

          <Route path="/add-trip" element={<h1>Add Trip</h1>} />

          <Route path="/viatic-salary" element={<h1>Viatic and Salary</h1>} />

          <Route path="/trip-history" element={<h1>History</h1>} />
          <Route path="/edit-trip/:id" element={<h1>Edit Trip</h1>} />

          <Route path="/towns" element={<h1>Towns</h1>} />
          <Route path="/add-town" element={<h1>Add Town</h1>} />
          <Route path="/edit-town/:id" element={<h1>Edit Town</h1>} />

        </Routes>
    
      </ BrowserRouter>
    </>
  );
}

export default App;
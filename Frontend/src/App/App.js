import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Homepage } from "../Pages/Homepage/Homepage";
import { TripForm } from "../Pages/TripForm/TripForm";
import { Report } from "../Pages/Report/Report";
import { TripHistory } from "../Pages/TripHistory/TripHistory";
import { Towns } from "../Pages/Towns/Towns";

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />

          <Route path="/add-trip" element={<TripForm />} />

          <Route path="/report" element={<Report />} />

          <Route path="/trip-history" element={<TripHistory />} />
          <Route path="/edit-trip/:id" element={<h1>Edit Trip</h1>} />

          <Route path="/towns" element={<Towns />} />
          <Route path="/add-town" element={<h1>Add Town</h1>} />
          <Route path="/edit-town/:id" element={<h1>Edit Town</h1>} />

        </Routes>
    
      </ BrowserRouter>
    </>
  );
}

export default App;
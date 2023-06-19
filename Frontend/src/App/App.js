import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Homepage } from "../Pages/Homepage/Homepage";
import { TripForm } from "../Pages/TripForm/TripForm";
import { Report } from "../Pages/Report/Report";
import { TripHistory } from "../Pages/TripHistory/TripHistory";
import { Towns } from "../Pages/Towns/Towns";
import { EditTrip } from "../Pages/EditTrip/EditTrip";

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
          <Route path="/edit-trip/:id" element={<EditTrip />} />

          <Route path="/towns" element={<Towns />} />

        </Routes>
    
      </ BrowserRouter>
    </>
  );
}

export default App;
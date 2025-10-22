import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRoute from "./routes/EventRoute/EventRoute";
import EditRoute from "./routes/editRoute/EditRoute";
import NewRoute from "./routes/newRoute/NewRoute";
import PasswordRoute from "./routes/passwordRoute/PasswordRoute";
import HomeRoute from "./routes/homeRoute/HomeRoute";

export default function App() {
    return (
        <div className="padding">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/event/:eventId" element={<EventRoute />} />
                    <Route path="/edit/:eventId" element={<EditRoute />} />
                    <Route
                        path="/password/:eventId"
                        element={<PasswordRoute />}
                    />
                    <Route path="/new" element={<NewRoute />} />
                    {/* todo 404 */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

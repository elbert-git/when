import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventRoute from "./routes/EventRoute/EventRoute";
import EditRoute from "./routes/editRoute/EditRoute";
import NewRoute from "./routes/newRoute/NewRoute";
import PasswordRoute from "./routes/passwordRoute/PasswordRoute";

export default function App() {
    return (
        <div className="padding">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<>root</>} />
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

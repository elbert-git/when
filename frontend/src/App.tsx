import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventRoute from "./routes/EventRoute/EventRoute";

export default function App() {
    return (
        <div className="padding">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<>root</>} />
                    <Route path="/event/:eventId" element={<EventRoute />} />
                    <Route path="/new" element={<>new</>} />
                    {/* todo 404 */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

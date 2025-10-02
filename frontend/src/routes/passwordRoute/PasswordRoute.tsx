import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import RedHeader from "../../commonComponents/RedHeader";
import ErrorLabel from "../../commonComponents/ErrorLabel";

export default function PasswordRoute() {
    const { eventId } = useParams<{ eventId: string }>();
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        const load = async () => {
            const res = await API.getEventName(eventId!);
            setName(res);
        };
        load();
    }, []);

    const onSubmit = async () => {
        const password = (
            document.getElementById("password") as HTMLInputElement
        ).value;
        const res = await API.verifyPassword(eventId!, password);
        if (res) {
            setError("");
            // route
            // todo route to event or edit
            nav(`/event/${eventId}`);
        } else {
            // allow error
            setError("incorrect password");
        }
    };

    return name != "" ? (
        <div className="root-password-route">
            <RedHeader>
                <h1>{name}</h1>
            </RedHeader>
            <div className="form-section">
                <h6>Event password</h6>
                <input className="text-input" type="password" id="password" />
            </div>
            <ErrorLabel message={error} />

            <button className="button-green" onClick={onSubmit}>
                Continue
            </button>
        </div>
    ) : (
        <>loading</>
    );
}

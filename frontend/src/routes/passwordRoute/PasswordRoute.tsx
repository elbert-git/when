import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

export default function PasswordRoute() {
    const { eventId } = useParams<{ eventId: string }>();
    const [name, setName] = useState("");
    useEffect(() => {
        const load = async () => {
            const res = await API.getEventName(eventId!);
            console.log("fetched", res);
            setName(res);
        };
        load();
    }, []);

    return name != "" ? (
        <div className="root-password-route">
            <input type="password" />
        </div>
    ) : (
        <>loading</>
    );
}

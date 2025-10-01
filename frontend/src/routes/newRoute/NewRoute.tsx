import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function NewRoute() {
    const nav = useNavigate();
    useEffect(() => {
        const load = async () => {
            // call for a new event
            const res = await API.createNewEvent();
            // cons
            // route to editign page
            nav(`/edit/${res.newId}`);
        };
        load();
    }, []);
    return <>loading</>;
}

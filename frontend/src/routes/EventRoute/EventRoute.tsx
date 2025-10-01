import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "./subComponents/Tooltip";
import { getDaysBetween, monthNumberToString } from "../../utilities";
import DateCheckBox from "./subComponents/DateCheckBox";
import API from "../../api";
import EventData, { Guest, tempData } from "../../EventData";

export function AvailabilityDisplay(props: { eventData: EventData }) {
    const eventData = props.eventData;
    const diffDays = getDaysBetween(eventData.startDate, eventData.endDate);
    return (
        <div className="availability-display">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {diffDays.map((x, i) => {
                            return (
                                <th key={i} className="date-cell">
                                    <div className="day-name">{x.dayName}</div>
                                    <div className="date">
                                        {monthNumberToString(x.month)} {x.day}
                                    </div>
                                    <div className="time-slots">
                                        <div>6-11am</div>
                                        <div>12-5pm</div>
                                        <div>5-11pm</div>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* create 5 rows */}
                    {eventData.guests.all.map((x, i) => {
                        return (
                            <tr key={i}>
                                {/* create columns */}
                                <td className="name-cell">{x.name}</td>
                                {diffDays.map((x, i) => {
                                    return (
                                        <td key={i} className="">
                                            <div className="checkbox-container">
                                                <DateCheckBox></DateCheckBox>
                                                <DateCheckBox></DateCheckBox>
                                                <DateCheckBox></DateCheckBox>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default function EventRoute() {
    // references
    const { eventId } = useParams<{ eventId: string }>();
    const nav = useNavigate();
    const [eventData, setEventData] = useState<EventData | null>();

    // on load
    useEffect(() => {
        const load = async () => {
            const eventData = await EventData.pullFromApi(eventId!);
            setEventData(eventData);
        };
        load();
    }, []);

    return eventData ? (
        <main className="root-event-route">
            <p>When are you free for:</p>
            <h1>{eventData.eventName}</h1>
            <button
                className="button fillWidth"
                onClick={() => {
                    nav(`/edit/${eventId!}`);
                }}
            >
                Event Settings
            </button>
            {/* todo most free display */}
            {/* tooltip */}
            <Tooltip>Add your name and mark when you are available</Tooltip>
            {/* table */}
            <AvailabilityDisplay eventData={eventData} />
        </main>
    ) : (
        "loading"
    );
}

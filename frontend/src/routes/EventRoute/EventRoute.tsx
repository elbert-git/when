import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "./subComponents/Tooltip";
import { getDaysBetween, monthNumberToString } from "../../utilities";
import DateCheckBox from "./subComponents/DateCheckBox";
import API from "../../api";
import EventData, { Guest, tempData } from "../../EventData";

export function AvailabilityDisplay(props: {
    eventData: EventData;
    onAvailabilitiesUpdate: Function;
}) {
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
                    {eventData.guests.all.map((x, memberIndex) => {
                        return (
                            <tr key={memberIndex}>
                                {/* create columns */}
                                <td className="name-cell">{x.name}</td>
                                {diffDays.map((x, i) => {
                                    const existingTimeslots =
                                        eventData.guests.all[memberIndex]
                                            .availabilities;
                                    const currentDate = `${x.year}-${x.month}-${x.day}`;
                                    return (
                                        <td key={i} className="">
                                            <div className="checkbox-container">
                                                <DateCheckBox
                                                    memberIndex={memberIndex}
                                                    checked={existingTimeslots.includes(
                                                        `${currentDate}-${0}`
                                                    )}
                                                    date={currentDate}
                                                    timeslot={0}
                                                    onAvailabilitiesUpdate={
                                                        props.onAvailabilitiesUpdate
                                                    }
                                                ></DateCheckBox>
                                                <DateCheckBox
                                                    memberIndex={memberIndex}
                                                    checked={existingTimeslots.includes(
                                                        `${currentDate}-${1}`
                                                    )}
                                                    date={currentDate}
                                                    onAvailabilitiesUpdate={
                                                        props.onAvailabilitiesUpdate
                                                    }
                                                    timeslot={1}
                                                ></DateCheckBox>
                                                <DateCheckBox
                                                    memberIndex={memberIndex}
                                                    checked={existingTimeslots.includes(
                                                        `${currentDate}-${2}`
                                                    )}
                                                    date={currentDate}
                                                    onAvailabilitiesUpdate={
                                                        props.onAvailabilitiesUpdate
                                                    }
                                                    timeslot={2}
                                                ></DateCheckBox>
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
            if (eventData) {
                setEventData(eventData as EventData);
            } else {
                nav(`/password/${eventId}`);
            }
        };
        load();
    }, []);

    // update availabilities
    const onUpdateAvailabilities = async (
        memberIndex: number,
        timeslot: string,
        add: boolean
    ) => {
        setEventData((prev) => {
            // copy state
            const newState = prev!.createCopy();

            // first check if adding or not
            if (add) {
                // only add if timeslot doesnt exist
                if (
                    newState.guests.all[memberIndex].availabilities.includes(
                        timeslot
                    ) === false
                ) {
                    // add availabilities
                    newState.guests.all[memberIndex].availabilities.push(
                        timeslot
                    );
                    // write to database
                    newState.writeToDatabase();
                }
            } else {
                // removing
                newState.guests.all[memberIndex].availabilities =
                    newState.guests.all[memberIndex].availabilities.filter(
                        (s) => {
                            return s !== timeslot;
                        }
                    );
            }

            // return to update stae
            return newState;
        });
    };

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
            <AvailabilityDisplay
                eventData={eventData}
                onAvailabilitiesUpdate={onUpdateAvailabilities}
            />
        </main>
    ) : (
        "loading"
    );
}

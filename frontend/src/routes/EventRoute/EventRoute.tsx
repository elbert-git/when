import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "./subComponents/Tooltip";
import {
    formatDateToReadable,
    getDaysBetween,
    monthNumberToString,
} from "../../utilities";
import DateCheckBox from "./subComponents/DateCheckBox";
import EventData from "../../EventData";
import { DateIcon } from "../../commonComponents/DateIcon";
import HeaderLogo from "../../commonComponents/HeaderLogo";

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

function MostFreeDateDisplay(props: { eventData: EventData }) {
    // prepare event data
    const eventData = props.eventData;
    const daysInBetween = getDaysBetween(
        props.eventData.startDate,
        props.eventData.endDate
    );
    const allTimeslots: Array<any> = [];
    daysInBetween.forEach((e) => {
        allTimeslots.push({
            timeslot: `${e.year}-${e.month}-${e.day}-0`,
            count: 0,
            date: e,
        });
        allTimeslots.push({
            timeslot: `${e.year}-${e.month}-${e.day}-1`,
            count: 0,
            date: e,
        });
        allTimeslots.push({
            timeslot: `${e.year}-${e.month}-${e.day}-2`,
            count: 0,
            date: e,
        });
    });
    // calculate how many are free in the days
    let mostFreeDay: any = allTimeslots[0];
    for (let index = 0; index < allTimeslots.length; index++) {
        const currentSlot = allTimeslots[index];
        eventData.guests.all.forEach((guest) => {
            if (guest.availabilities.includes(currentSlot.timeslot)) {
                currentSlot.count += 1;
            }
        });
    }
    for (let index = 0; index < allTimeslots.length; index++) {
        const currentSlot = allTimeslots[index];
        if (currentSlot.count > mostFreeDay.count) {
            mostFreeDay = currentSlot;
        }
    }
    const everyoneIsFree = mostFreeDay.count >= eventData.guests.all.length;
    const readableDate = formatDateToReadable(
        `${mostFreeDay.date.year}-${mostFreeDay.date.month}-${mostFreeDay.date.day}`
    );

    // handling timeslot message
    console.log(mostFreeDay);
    const timeslotToSentence = [
        "in the morning.",
        "in the afternoon period.",
        "at evening or nightime.",
    ];
    const timeslotIndex = Number(
        mostFreeDay.timeslot[mostFreeDay.timeslot.length - 1]
    );
    const majorityFree = mostFreeDay.count >= eventData.guests.all.length / 2;
    console.log("majority", majorityFree);
    const style: React.CSSProperties = {
        padding: majorityFree ? "1rem" : "0rem",
        maxHeight: majorityFree ? "20rem" : "0rem",
        transition: "0.3s",
    };
    return (
        <div className="most-free-display" style={style}>
            {/* date icon */}
            <DateIcon
                month={mostFreeDay.date.month}
                day={mostFreeDay.date.day}
                dayname={mostFreeDay.date.dayName}
            />
            <div className="col-2">
                <div className="header">Most Free Date: {readableDate}</div>
                <div className="body">
                    {everyoneIsFree
                        ? "Everyone is free"
                        : "Most people are free"}
                    {" " + timeslotToSentence[timeslotIndex]}
                </div>
            </div>
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

    const onShareButtonClicked = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `When are you free for: ${eventData!.eventName}`,
                    url: window.location.href,
                });
                console.log("Content shared successfully");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert(
                "Web Share API is not supported in your browser. Please just share the URL and password to your friends"
            );
        }
    };

    return eventData ? (
        <main className="root-event-route">
            <HeaderLogo />
            <p>are you free for:</p>
            <h1>{eventData.eventName}</h1>
            {/* todo most free display */}
            <MostFreeDateDisplay eventData={eventData} />
            <Tooltip>
                Scroll through the dates and tap when you are roughly free.
                (Decide the actual timings later)
            </Tooltip>
            <AvailabilityDisplay
                eventData={eventData}
                onAvailabilitiesUpdate={onUpdateAvailabilities}
            />
            {/* buttons */}
            <button
                className="button-green fillWidth"
                onClick={onShareButtonClicked}
            >
                Share
            </button>
            <button
                className="button fillWidth"
                onClick={() => {
                    nav(`/edit/${eventId!}`);
                }}
            >
                Event Settings
            </button>
            {/* tooltip */}
            {/* table */}
        </main>
    ) : (
        "loading"
    );
}

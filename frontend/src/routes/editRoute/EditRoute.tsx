import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { EventData } from "../EventRoute/EventRoute";
import RedHeader from "../../commonComponents/RedHeader";
import { ImCross } from "react-icons/im";

function MemberRow(props: { name: string }) {
    return (
        <div className="member-row">
            <input
                type="text"
                placeholder="Enter name"
                defaultValue={props.name}
            />
            <button className="">
                <ImCross color="#ff4f4f" size={"1rem"} />
            </button>
        </div>
    );
}

export default function EditRoute() {
    const { eventId } = useParams<{ eventId: string }>();
    const [eventData, setEventData] = useState<EventData | null>(null);
    useEffect(() => {
        const load = async () => {
            const res = await API.getEventdata(eventId as string);
            console.log(res);
            setEventData(res);
        };
        load();
    }, []);

    return eventData ? (
        <div className="root-edit-event">
            <RedHeader>
                <h1>Event Settings</h1>
            </RedHeader>
            <form>
                {/* General settings */}
                <h5>General Settings</h5>
                {/* event name */}
                <div className="form-section">
                    <h6>Event name</h6>
                    <input type="text" defaultValue={eventData.eventName} />
                </div>
                {/* event password */}
                <div className="form-section">
                    <div className="flex flexAlignEnd">
                        <h6>Event password</h6>
                        <div style={{ width: "0.5rem" }}></div>
                        <div className="font-small">(optional)</div>
                    </div>
                    <input type="text" defaultValue={eventData.eventName} />
                </div>
                {/* date pickers */}
                <div className="form-section">
                    <h6>Date range to schedule</h6>
                    <div className="flex date-picker-container">
                        <label className="flex flexColumn">
                            <div>Start Date</div>
                            <input
                                type="date"
                                defaultValue={eventData.startDate.replace(
                                    /\//g,
                                    "-"
                                )}
                            />
                        </label>
                        <label className="flex flexColumn">
                            <div>End Date</div>
                            <input
                                type="date"
                                defaultValue={eventData.endDate.replace(
                                    /\//g,
                                    "-"
                                )}
                            />
                        </label>
                    </div>
                </div>
                {/* Members */}
                <h5>Members</h5>
                {eventData.guests.all.map((x, i) => {
                    return <MemberRow name={x.name} key={i} />;
                })}
                <button type="submit" className="button-grey add-member-button">
                    Add Member
                </button>
                <button type="submit" className="button-green">
                    save
                </button>
            </form>
        </div>
    ) : (
        "loading"
    );
}

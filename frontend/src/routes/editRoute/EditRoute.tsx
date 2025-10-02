import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RedHeader from "../../commonComponents/RedHeader";
import { ImCross } from "react-icons/im";
import EventData from "../../EventData";
import { useNavigate } from "react-router-dom";
import ErrorLabel from "../../commonComponents/ErrorLabel";
import { isDateTodayOrFuture, isEndDateWithinTwoWeeks } from "../../utilities";

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
    const nav = useNavigate();
    const { eventId } = useParams<{ eventId: string }>();
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [dateError, setDateError] = useState("");
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

    // callback
    const onSaveButtonSubmitted = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        // prevent default
        e.preventDefault();
        if (dateError === "") {
            // update event data
            eventData!.eventName = (
                document.getElementById("eventName") as HTMLInputElement
            ).value;
            eventData!.eventPassword = (
                document.getElementById("eventPassword") as HTMLInputElement
            ).value;
            eventData!.startDate = (
                document.getElementById("startDate") as HTMLInputElement
            ).value;
            eventData!.endDate = (
                document.getElementById("endDate") as HTMLInputElement
            ).value;
            // write to database
            await eventData!.writeToDatabase();
            // route to event page
            nav(`/event/${eventData!.id}`);
        }
    };

    const onDatesChanged = () => {
        // get elements
        const startDate = (
            document.getElementById("startDate") as HTMLInputElement
        ).value;
        const endDate = (document.getElementById("endDate") as HTMLInputElement)
            .value;
        // -- maybe we should check fi start date is different?
        // verify start date is today or after
        // if(isDateTodayOrFuture(startDate) == false){
        //     setDateError("Start date must be today or later")
        //     return null
        // }
        // verify end date is within 2 weeks of today
        if (isEndDateWithinTwoWeeks(startDate, endDate) == false) {
            setDateError("End date must be within 2 weeks of start date");
            return null;
        }
        setDateError("");
    };

    return eventData ? (
        <div className="root-edit-event">
            <RedHeader>
                <h1>Event Settings</h1>
            </RedHeader>
            <form onSubmit={onSaveButtonSubmitted}>
                {/* General settings */}
                <h5>General Settings</h5>
                {/* event name */}
                <div className="form-section">
                    <h6>Event name</h6>
                    <input
                        required
                        type="text"
                        defaultValue={eventData.eventName}
                        className="text-input"
                        id="eventName"
                    />
                </div>
                {/* event password */}
                <div className="form-section">
                    <div className="flex flexAlignEnd">
                        <h6>Event password</h6>
                        <div style={{ width: "0.5rem" }}></div>
                        <div className="font-small">(optional)</div>
                    </div>
                    <input
                        type="password"
                        id="eventPassword"
                        className="text-input"
                        defaultValue={eventData.eventPassword}
                    />
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
                                required
                                className="text-input"
                                id="startDate"
                                onChange={onDatesChanged}
                            />
                        </label>
                        <label className="flex flexColumn">
                            <div>End Date</div>
                            <input
                                id="endDate"
                                type="date"
                                defaultValue={eventData.endDate.replace(
                                    /\//g,
                                    "-"
                                )}
                                className="text-input"
                                required
                                onChange={onDatesChanged}
                            />
                        </label>
                    </div>
                    <ErrorLabel message={dateError} />
                </div>
                {/* Members */}
                <h5>Members</h5>
                {eventData.guests.all.map((x, i) => {
                    return <MemberRow name={x.name} key={i} />;
                })}
                <button className="button-grey add-member-button">
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

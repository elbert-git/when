import { dayNameToShort, monthNumberToStringShort } from "../utilities";
export function DateIcon(props: {
    month: number;
    day: number;
    dayname: string;
}) {
    const shortenedDayName = dayNameToShort(props.dayname).toLocaleUpperCase();
    return (
        <div className="date-icon">
            <div className="month">{monthNumberToStringShort(props.month)}</div>
            <div className="day">{props.day}</div>
            <div className="day-name">{shortenedDayName}</div>
        </div>
    );
}

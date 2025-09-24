export function DateIcon(props: { month: number; day: number }) {
    return (
        <div className="date-icon">
            <div className="month">{props.month}</div>
            <div className="day">{props.day}</div>
        </div>
    );
}

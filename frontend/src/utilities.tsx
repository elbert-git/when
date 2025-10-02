export function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
}

export function getDaysBetween(
    a: string,
    b: string
): { month: number; day: number; dayName: string }[] {
    const dateA = new Date(a);
    const dateB = new Date(b);

    const startDate = new Date(Math.min(dateA.getTime(), dateB.getTime()));
    const endDate = new Date(Math.max(dateA.getTime(), dateB.getTime()));

    const result: { month: number; day: number; dayName: string }[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const dayName = currentDate.toLocaleString("en-US", {
            weekday: "long",
        });
        result.push({ month, day, dayName });
        currentDate.setDate(currentDate.getDate() + 1); // Increment day
    }
    return result;
}

export function monthNumberToString(num: number) {
    const mapping = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];
    return mapping[num - 1];
}

export function isDateTodayOrFuture(dateString: string): boolean {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Normalize both dates to the start of the day to compare only the date part
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate.getTime() >= today.getTime();
}

export function isEndDateWithinTwoWeeks(
    startDateString: string,
    endDateString: string
): boolean {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Normalize dates to the start of the day for accurate day comparison
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const fourteenDaysInMilliseconds = 14 * oneDayInMilliseconds;

    const difference = endDate.getTime() - startDate.getTime();

    // Condition 1: endDate must be in the future relative to startDate (at least 1 day later)
    // Condition 2: The difference must be between 1 and 14 days (inclusive)
    return (
        difference >= oneDayInMilliseconds &&
        difference <= fourteenDaysInMilliseconds
    );
}

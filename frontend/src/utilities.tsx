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
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];
    return mapping[num - 1];
}

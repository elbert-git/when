export function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
}

export function getDateTwoWeeksLater(startDate = new Date()) {
    const futureDate = new Date(startDate);
    futureDate.setDate(startDate.getDate() + 14);
    return futureDate;
}

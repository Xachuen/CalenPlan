export function getNextMonth(date) {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return nextMonth;
  }
  
export function getPastMonth(date) {
    const pastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return pastMonth;
}

export function getDaysOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
}

export function getWeekday(date) {
    return date.getDay();
}

export function areDatesEqual(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

export function getMinutesAway(time1, time2) {
    const date1 = new Date(`1970-01-01T${time1}:00Z`);
    const date2 = new Date(`1970-01-01T${time2}:00Z`);

    const milisecondDifference = Math.abs(date2 - date1);
    const minutesDifference = Math.floor(milisecondDifference / 1000 / 60);

    return minutesDifference
}

export const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const weekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
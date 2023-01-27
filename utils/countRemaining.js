export const countRemaining = (alarmTime) => {
    const current = Date.now();
    const remaining = alarmTime - current;
    let seconds = Math.floor(remaining / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    // hours = hours % 24;
    // debugger
    const str =
        `${hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : "00:"}` +
        `${minutes > 0 ? (minutes < 10 ? `0${minutes}:` : `${minutes}:`) : "00:"
        }` +
        `${seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}`) : "00"}`;
    return str;
};
export const getTimezoneOffsetInUtc = () => {
    const date = new Date();
    const dateArr = date.toString().split(' ');
    const gmt = dateArr[5];
    let offset;
    if (gmt.includes('+')) {
        const charArr = gmt.split('+');
        offset = `+${charArr[1]}`;
    } else if (gmt.includes('-')) {
        const charArr = gmt.split('-');
        offset = `-${charArr[1]}`;
    }
    return offset;
}
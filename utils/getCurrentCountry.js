import timezoneData from '../data/timezone.json';

export const getCurrentCountry = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timezoneData[timezone];
    return country.toString();
}
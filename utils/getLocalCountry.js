import {countryData} from "../data/countries";
import timezoneData from "../data/timezone";

export const getLocalCountry = () => {
    let result;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timezoneData[timezone];
    countryData.forEach((item) => {
        if (item.countryName === country) {
            result = item;
        }
    });
    return result;
}
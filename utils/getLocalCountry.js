import {countryData} from "../data/countries";
import timezoneData from "../data/timezone";
import axios from "axios";
import {GET_COUNTRY_API} from "../constant/endpoints";

export const getLocalCountry = async () => {

    let countryData;

    await axios.get(GET_COUNTRY_API)
        .then((response) => {
            countryData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    let result;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timezoneData[timezone];
    countryData?.forEach((item) => {
        if (item.name === country) {
            result = item.name;
        }
    });
    return result;
}
import axios from "axios";
import {GET_COUNTRY_API, GET_TIMEZONE_BY_COUNTRY} from "../constant/endpoints";

export const getCountryNameFromTimeZone = async (timezone) => {

    let countryData, timeZoneData, country, countryName;

    await axios.get(GET_COUNTRY_API)
        .then((response) => {
            countryData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    await axios.get(GET_TIMEZONE_BY_COUNTRY)
        .then((response) => {
            timeZoneData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    await timeZoneData?.forEach((item) => {
        if(item.name === timezone) {
            country = item.countryId;
        }
    });

    await countryData?.forEach((item) => {
        if(item._id === country) {
            countryName = item.name;
        }
    });

    return countryName;
};
import {getCurrentCountry} from "./getCurrentCountry";

export const calculateTime = (offset) => {
    if(JSON.parse(localStorage.getItem('country')) === getCurrentCountry()) {
        return new Date();
    } else {
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        let result = new Date(utc + (3600000 * offset));
        return result;
    }
};
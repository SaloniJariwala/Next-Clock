import Frenchflag from "../public/assets/svg/france.png";
import EnglandFlag from "../public/assets/svg/england.png";
import ChinaFlag from "../public/assets/svg/china.png";
import SpainFlag from "../public/assets/svg/spain.png";
import Indiaflag from "../public/assets/svg/india.png";
import Japanflag from "../public/assets/svg/japan.png";

export const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
        icon: EnglandFlag,
    },
    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in',
        icon: Indiaflag
    },
    {
        code: 'jp',
        name: 'Japan',
        country_code: 'jp',
        icon: Japanflag,
    },
    {
        code: 'fr',
        name: 'French',
        country_code: 'fr',
        icon: Frenchflag,
    },
    {
        code: 'cn',
        name: 'Chinese',
        country_code: 'cn',
        icon: ChinaFlag,
    },
    {
        code: 'sp',
        name: 'Spanish',
        country_code: 'sp',
        icon: SpainFlag,
    },
]
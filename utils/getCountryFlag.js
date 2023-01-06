import India from "../public/Assets/flag/india.png";
import Usa from "../public/Assets/flag/usa.png";
import Japan from "../public/Assets/flag/japan.png";
import Canada from "../public/Assets/flag/canada.png";
import London from "../public/Assets/flag/london.png";
import France from "../public/Assets/flag/france.png";
import Spain from "../public/Assets/flag/spain.png";
import Italy from "../public/Assets/flag/italy.png";
import Turkey from "../public/Assets/flag/turkey.png";
import Greece from "../public/Assets/flag/greece.png";
import Germany from "../public/Assets/flag/germany.png";
import Sweden from "../public/Assets/flag/sweden.png";
import Russia from "../public/Assets/flag/russia.png";
import China from "../public/Assets/flag/china.png";
import Portugal from "../public/Assets/flag/portugal.png";
import Denmark from "../public/Assets/flag/denmark.png";
import southAfrica from "../public/Assets/flag/southAfrica.png";
import Malaysia from "../public/Assets/flag/malaysia.png";
import Thailand from "../public/Assets/flag/thailand.png";
import Switzerland from "../public/Assets/flag/switzerland.png";
import Mexico from "../public/Assets/flag/mexico.png";
import Ireland from "../public/Assets/flag/ireland.png";
import Netherlands from "../public/Assets/flag/netherlands.png";
import Morocco from "../public/Assets/flag/morocco.png";
import Brazil from "../public/Assets/flag/Brazil.png";
import Croatia from "../public/Assets/flag/croatia.png";
import Singapore from "../public/Assets/flag/singapore.png";
import Belgium from "../public/Assets/flag/belgium.png";
import Austria from "../public/Assets/flag/austria.png";
import Indonesia from "../public/Assets/flag/indonesia.png";
import Argentina from "../public/Assets/flag/argentina.png";
import Egypt from "../public/Assets/flag/egypt.png";
import Jordan from "../public/Assets/flag/jordan.png";
import Ukraine from "../public/Assets/flag/ukraine.png";
import Vietnam from "../public/Assets/flag/vietnam.png";
import Norway from "../public/Assets/flag/norway.png";
import southKorea from "../public/Assets/flag/southKorea.png";
import newZealand from "../public/Assets/flag/newZealand.png";
import saudiArabia from "../public/Assets/flag/saudiArabia.png";
import Hungary from "../public/Assets/flag/hungary.png";
import Bulgaria from "../public/Assets/flag/bulgaria.png";
import Romania from "../public/Assets/flag/romania.png";
import Pakistan from "../public/Assets/flag/pakistan.png";
import Bangladesh from "../public/Assets/flag/bangladesh.png";
import Philippines from "../public/Assets/flag/romania.png";
import Afghanistan from "../public/Assets/flag/afghanistan.png";
import Qatar from "../public/Assets/flag/qatar.png";

export const getCountryFlag = (country) => {
    switch (country) {
        case 'India':
            return India;

        case 'USA':
            return Usa;

        case 'Japan':
            return Japan;

        case 'Canada':
            return Canada;

        case 'London':
            return London;

        case 'France':
            return France;

        case 'Spain':
            return Spain;

        case 'Italy':
            return Italy;

        case 'Turkey':
            return Turkey;

        case 'Greece':
            return Greece;

        case 'Germany':
            return Germany;

        case 'Sweden':
            return Sweden;

        case 'Russia':
            return Russia;

        case 'China':
            return China;

        case 'Portugal':
            return Portugal;

        case 'Denmark':
            return Denmark;

        case 'South Africa':
            return southAfrica;

        case 'Malaysia':
            return Malaysia;

        case 'Switzerland':
            return Switzerland;

        case 'Mexico':
            return Mexico;

        case 'Thailand':
            return Thailand;

        case 'Ireland':
            return Ireland;

        case 'Netherlands':
            return Netherlands;

        case 'Morocco':
            return Morocco;

        case 'Croatia':
            return Croatia;

        case 'Brazil':
            return Brazil;

        case 'Singapore':
            return Singapore;

        case 'Belgium':
            return Belgium;

        case 'Austria':
            return Austria;

        case 'Indonesia':
            return Indonesia;

        case 'Poland':
            return Poland;

        case 'Argentina':
            return Argentina;

        case 'Egypt':
            return Egypt;

        case 'Jordan':
            return Jordan;

        case 'Ukraine':
            return Ukraine;

        case 'Vietnam':
            return Vietnam;

        case 'Norway':
            return Norway;

        case 'South Korea':
            return southKorea;

        case 'Finland':
            return Finland;

        case 'New Zealand':
            return newZealand;

        case 'Saudi Arabia':
            return saudiArabia;

        case 'Hungary':
            return Hungary;

        case 'Bulgaria':
            return Bulgaria;

        case 'Romania':
            return Romania;

        case 'Pakistan':
            return Pakistan;

        case 'Bangladesh':
            return Bangladesh;

        case 'Philippines':
            return Philippines;

        case 'Afghanistan':
            return Afghanistan;

        case 'Qatar':
            return Qatar;

        default:
            // console.log('Invalid Choice...');
            return;

    }
}
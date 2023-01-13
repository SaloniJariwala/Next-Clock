export const getLanguageLabel = (locale, item) => {
    switch (locale) {
        case 'en':
            return item.english;
            break;

        case 'hi':
            return item.hindi;
            break;

        case 'fr':
            return item.french;
            break;

        case 'cn':
            return item.chinese;
            break;

        case 'jp':
            return item.japanese;
            break;

        case 'sp':
            return item.spanish;
            break;

        default:
            console.log('Invalid Locale');
    }
} 
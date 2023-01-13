import i18n from "../i18n";

export const getLabelName = (locale) => {
    switch (locale) {
        case 'en':
            return i18n.t('english');
            break;

        case 'cn':
            return i18n.t('chinese');
            break;

        case 'jp':
            return i18n.t('japanese');
            break;

        case 'fr':
            return i18n.t('french');
            break;

        case 'sp':
            return i18n.t('spanish');
            break;

        case 'hi':
            return i18n.t('hindi');
            break;

        default:
            console.log('Invalid Language');
    }
} 
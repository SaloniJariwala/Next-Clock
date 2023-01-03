export const getLabelName = (locale) => {
    switch (locale) {
        case 'en':
            return 'English';
            break;

        case 'cn':
            return 'Chinese';
            break;

        case 'jp':
            return 'Japanese';
            break;

        case 'fr':
            return 'French';
            break;

        case 'sp':
            return "Spanish";
            break;

        case 'hi':
            return "Hindi";
            break;

        default:
            console.log('Invalid Language');
    }
} 
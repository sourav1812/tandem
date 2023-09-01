import en from '@tandem/constants/lang/en.json';
import fr from '@tandem/constants/lang/fr.json';
import nl from '@tandem/constants/lang/nl.json';
import it from '@tandem/constants/lang/it.json';

import {I18n} from 'i18n-js';

const i18n = new I18n(en);
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.translations = {en, fr, nl, it};
export default i18n;

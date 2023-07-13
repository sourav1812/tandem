import en from '@tandem/constants/api/lang/en.json';
import fr from '@tandem/constants/api/lang/fr.json';
import de from '@tandem/constants/api/lang/de.json';
import it from '@tandem/constants/api/lang/it.json';

import {I18n} from 'i18n-js';

const i18n = new I18n(en);
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.translations = {en, fr, de, it};
export default i18n;

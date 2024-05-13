import en from '@tandem/constants/lang/en.json';
import fr from '@tandem/constants/lang/fr.json';
import de from '@tandem/constants/lang/de.json';
import it from '@tandem/constants/lang/it.json';
import po from '@tandem/constants/lang/po.json';
import ur from '@tandem/constants/lang/ur.json';
import pu from '@tandem/constants/lang/pu.json';
import tr from '@tandem/constants/lang/tr.json';

import {I18n} from 'i18n-js';

const i18n = new I18n(en);
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.translations = {en, fr, de, it, po, ur, pu, tr};
export default i18n;

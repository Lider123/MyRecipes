import I18n from 'react-native-i18n';
import en from '../config/language/en';
import ru from '../config/language/ru';

I18n.fallbacks = true;
I18n.missingBehavior = 'guess';
I18n.defaultLocale = 'en';

I18n.translations = { ru, en };

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale;

export const translateHeaderText = (langKey) => ({screenProps}) => {
  const title = I18n.translate(langKey, screenProps.language);
  return {title};
};

export default I18n.translate.bind(I18n);

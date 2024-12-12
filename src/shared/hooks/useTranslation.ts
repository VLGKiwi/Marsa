// /utils/useTranslation.ts
import { Locale, Namespace, Translations, TranslationData } from './types';

// Импортируем переводы
import enIntro from '../../locales/en/intro.json';
// import enAbout from '../../locales/en/about.json';
// import enCommon from '../../locales/en/common.json';
import ruIntro from '../../locales/ru/intro.json';
// import ruAbout from '../../locales/ru/about.json';
// import ruCommon from '../../locales/ru/common.json';

// Собираем переводы в один объект
const translations: Record<Locale, TranslationData> = {
  en: {
    intro: enIntro,
    // about: enAbout,
    // common: enCommon,
  },
  ru: {
    intro: ruIntro,
    // about: ruAbout,
    // common: ruCommon,
  },
};

/**
 * Хук для получения переводов
 * @param locale - текущая локаль
 * @param namespace - пространство имен переводов
 * @returns объект переводов
 */
export const useTranslation = (
  locale: Locale,
  namespace: Namespace
): Translations => {
  return translations[locale][namespace];
};

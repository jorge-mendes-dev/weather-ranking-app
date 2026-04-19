import { createInstance, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/common.json';
import es from '../locales/es/common.json';
import pt from '../locales/pt/common.json';

const resources = {
  en: { common: en },
  pt: { common: pt },
  es: { common: es },
};

const options: InitOptions = {
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources,
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
};

const i18n = createInstance();
i18n.use(initReactI18next).init(options);

export default i18n;

import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Connected component demo": "Connected component demo",
                    "Search...": "Search...",
                    "Add wish": "Add wish",
                    "Make a wish": "Make a wish",
                }
            },
            es: {
                translations: {
                    "Connected component demo": "Ejemplo de componente conectado",
                    "Search...": "Buscar...",
                    "Add wish": "Añadir deseo",
                    "Make a wish": "Pide un deseo",
                }
            }
        },
        fallbackLng: 'en',
        debug: true,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
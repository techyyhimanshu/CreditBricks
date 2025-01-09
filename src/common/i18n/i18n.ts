import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

const panLang =  localStorage.getItem("lang") || 'en';

i18n
  .use(HttpBackend)
  .init({
    fallbackLng: panLang,
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

  if(panLang!= undefined && panLang!=''){
     i18n.changeLanguage(panLang);
  }
  
export default i18n;
 

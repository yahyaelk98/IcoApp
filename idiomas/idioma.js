/* FICHERO QUE GESTIONA LOS IDIOMAS. FALTA IMPLEMENTAR CAMBIO IDIOMA */
import I18n from "i18n-js";

import es from "./es";
import cat from "./cat";
import en from "./en";

I18n.locale = "cat";

I18n.fallbacks = true;
I18n.translations = {
    es,
    cat,
    en
};

export default I18n;